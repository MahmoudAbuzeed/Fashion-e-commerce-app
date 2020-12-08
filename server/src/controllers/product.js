const Product = require("../models/product");
const slugify = require("slugify");
const Category = require("../models/category");

exports.createProduct = (req, res) => {
  const { name, price, description, category, quantity, createdBy } = req.body;
  let productPictures = [];

  if (req.files.length > 0) {
    productPictures = req.files.map((file) => {
      return { img: file.filename };
    });
  }

  const product = new Product({
    name: name,
    slug: slugify(name),
    price,
    quantity,
    description,
    productPictures,
    category,
    createdBy: req.user._id,
  });

  product.save((error, product) => {
    if (error) return res.status(400).json({ error });
    if (product) {
      res.status(201).json({ product });
    }
  });
};

exports.getProductsBySlug = (req, res) => {
  const { slug } = req.params;
  Category.findOne({ slug: slug })
    .select("_id")
    .exec((error, category) => {
      if (error) {
        return res.status(400).json({ error });
      }

      if (category) {
        Product.find({ category: category._id }).exec((error, products) => {
          if (error) {
            return res.status(400).json({ error });
          }

          if (products.length > 0) {
            res.status(200).json({
              products,
            });
          }
        });
      }
    });
};

exports.getProductDetailsById = (req, res) => {
  const { productId } = req.params;
  if (productId) {
    Product.findOne({ _id: productId }).exec((error, product) => {
      if (error) return res.status(400).json({ error });
      if (product) {
        res.status(200).json({ product });
      }
    });
  } else {
    return res.status(400).json({ error: "Params required" });
  }
};

exports.updateProduct = async (req, res) => {
  const { productId } = req.params;

  const { name, slug, price, quantity, description, category } = req.body;

  let productPictures = [];

  if (req.files.length > 0) {
    productPictures = req.files.map((file) => {
      return { img: file.filename };
    });
  }

  const product = await Product.findById(productId);
  if (product) {
    product.name = name;
    product.slug = slug;
    product.price = price;
    product.category = category;
    product.quantity = quantity;
    product.description = description;
    product.productPictures = productPictures;

    const updatedProduct = await product.save();
    if (updatedProduct) {
      return res
        .status(201)
        .json({ message: "Product Updated", data: updatedProduct });
    }
  }
  return res.status(400).json({ error: " Error in Updating Product." });
};

exports.deleteProduct = async (req, res) => {
  const productId = req.params.productId;
  const deletedProduct = await Product.findOneAndDelete({ _id: productId });
  if (deletedProduct) {
    res.status(201).json({ message: "Product Deleted" });
  } else {
    res.status(400).json("Error in Deletion.");
  }
};
