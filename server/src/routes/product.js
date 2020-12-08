const express = require("express");
const { requireSignin, adminMiddleware } = require("../common-middleware");
const {
  createProduct,
  getProductsBySlug,
  getProductDetailsById,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");
const multer = require("multer");
const router = express.Router();
const shortid = require("shortid");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/product/create",
  requireSignin,
  adminMiddleware,
  upload.array("productPicture"),
  createProduct
);
router.get("/products/:slug", getProductsBySlug);
router.get("/product/:productId", getProductDetailsById);
router.get(
  "/product/update/:productId",
  upload.array("productPicture"),
  updateProduct
);
router.get("/product/delete:productId", deleteProduct);

module.exports = router;
