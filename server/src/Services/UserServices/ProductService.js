const Product = require("../../models/product");
const Category = require("../../models/category");

class ProductService {
  async getProducts() {
    const products = await Product.find({})
      .select(
        "_id name price quantity slug description productPictures category"
      )
      .populate({ path: "category", select: "_id name" });

    return products;
  }

  addProduct(productObj) {
    const product = new Product(productObj);
    product.save();
    return product;
  }

  async getProductsBySlug(slug) {
    const category = await Category.findOne({ slug: slug }).select("_id type");
    if (category) {
      const products = await Product.find({ category: category._id });
      if (category.type) {
        if (products.length > 0) {
          return products;
        }
      } else {
        return null;
      }
    }
  }

  async getProductDetailsById(productId) {
    if (productId) {
      const product = await Product.findOne({ _id: productId });
      if (product) {
        return product;
      }
    } else {
      return null;
    }
  }

  async deleteProduct(productId) {
    if (productId) {
      const product = await Product.deleteOne({ _id: productId });
      if (product) {
        return product;
      }
    } else {
      return null;
    }
  }
}

module.exports = ProductService;
