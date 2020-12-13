const Category = require("../../models/category");
const slugify = require("slugify");
const shortid = require("shortid");
const CategoryService = require("../../Services/UserServices/CategoryService");
const { REMOVED_SUCCESS_MSG } = require("../../Shared/Constant");

exports.getCategories = async (req, res) => {
  const category = await Category.find({});
  const categoryService = new CategoryService();
  const categories = categoryService.getCategory(category);
  return res.status(200).json({ categoryList: categories });
};

exports.deleteCategories = async (req, res) => {
  const { ids } = req.body.payload;
  const categoryService = new CategoryService();
  await categoryService.deleteCategories(ids);
  return res.status(201).json({ message: REMOVED_SUCCESS_MSG });
};

exports.addCategory = async (req, res) => {
  const categoryObj = {
    name: req.body.name,
    slug: `${slugify(req.body.name)}-${shortid.generate()}`,
  };
  if (req.file) {
    categoryObj.categoryImage =
      process.env.API + "/public/" + req.file.filename;
  }
  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }

  const categoryService = new CategoryService();
  const addCategory = await categoryService.addCategory(categoryObj);
  return res.status(201).json({ addCategory: addCategory });
};

exports.updateCategories = async (req, res) => {
  const { _id, name, parentId, type } = req.body;

  const categoryService = new CategoryService();
  const updatedCategories = await categoryService.updatedCategory(
    _id,
    name,
    parentId,
    type
  );
  return res.status(201).json({ updatedCategories: updatedCategories });
};
