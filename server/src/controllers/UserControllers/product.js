const slugify = require("slugify");
const ProductService = require("../../Services/UserServices/ProductService");

exports.createProduct = async (req, res) => {
  const { name, price, description, category, quantity } = req.body;
  let productPictures = [];
  if (req.files.length > 0) {
    productPictures = req.files.map((file) => {
      return { img: file.filename };
    });
  }
  const prodcutObj = {
    name: name,
    slug: slugify(name),
    price,
    quantity,
    description,
    productPictures,
    category,
    createdBy: req.user._id,
  };
  const productService = new ProductService();
  const addProduct = await productService.addProduct(prodcutObj);
  return res.status(201).json({ addProduct: addProduct });
};

exports.getProductsBySlug = async (req, res) => {
  const { slug } = req.params;
  const productService = new ProductService();
  const getProductsBySlug = await productService.getProductsBySlug(slug);
  return res.status(201).json({ getProductsBySlug: getProductsBySlug });
};

exports.getProductDetailsById = async (req, res) => {
  const { productId } = req.params;
  const productService = new ProductService();
  const getProductsById = await productService.getProductsById(productId);
  return res.status(201).json({ getProductsById: getProductsById });
};

exports.deleteProductById = async (req, res) => {
  const { productId } = req.body.payload;
  const productService = new ProductService();
  const deleteProduct = await productService.deleteProduct(productId);
  return res.status(201).json({ deleteProduct: deleteProduct });
};

exports.getProducts = async (req, res) => {
  const productService = new ProductService();
  const getProducts = await productService.getProducts();
  return res.status(201).json({ Products: getProducts });

  res.status(200).json({ products });
};
