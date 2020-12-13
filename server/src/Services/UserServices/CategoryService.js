const Category = require("../../models/category");

class CategoryService {
  getCategory(categories, parentId = undefined) {
    const category = this.filterCateogory(categories, parentId);
    const categoryList = this.formatCategory(categories, category);
    return categoryList;
  }

  filterCateogory(categories, parentId) {
    return categories.filter((cat) => cat.parentId == parentId);
  }

  formatCategory(categories, category) {
    return category.map(
      (cate) =>
        (cate = {
          _id: cate._id,
          name: cate.name,
          slug: cate.slug,
          parentId: cate.parentId,
          type: cate.type,
          children: this.getCategory(categories, cate._id),
        })
    );
  }

  async deleteCategories(_id) {
    await Category.deleteMany({ _id });
  }

  addCategory(categoryObj) {
    const category = new Category(categoryObj);
    category.save();
    return category;
  }

  async updateCategory(_id, name, parentId, type) {
    const updatedCategories = [];
    if (name instanceof Array) {
      for (let i = 0; i < name.length; i++) {
        const category = {
          name: name[i],
          type: type[i],
        };
        if (parentId[i] !== "") {
          category.parentId = parentId[i];
        }

        const updatedCategory = await Category.findOneAndUpdate(
          { _id: _id[i] },
          category,
          { new: true }
        );
        updatedCategories.push(updatedCategory);
      }
      return res.status(201).json({ updateCategories: updatedCategories });
    } else {
      const category = {
        name,
        type,
      };
      if (parentId !== "") {
        category.parentId = parentId;
      }
      const updatedCategory = await Category.findOneAndUpdate(
        { _id },
        category,
        {
          new: true,
        }
      );
      return res.status(201).json({ updatedCategory });
    }
  }
}
module.exports = CategoryService;
