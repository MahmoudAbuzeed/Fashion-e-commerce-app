const Page = require("../../models/page");

const PageService = require("../../Services/AdminServices/PageService");

exports.createPage = (req, res) => {
  const { banners, products } = req.files;
  const { title, description, category, type } = req.body;
  const pageObj = {
    title: title,
    price,
    quantity,
    description,
    productPictures,
    category,
    type,
    createdBy: req.user._id,
  };
  const pageService = new PageService();
  const newPage = pageService.createPage(banners, products, pageObj);
  return res.status(201).json({ newPage: newPage });
};

exports.getPage = (req, res) => {
  const { category, type } = req.params;
  const pageService = new PageService();
  const getPage = pageService.getPage(category, type);
  return res.status(201).json({ page: getPage });
};
