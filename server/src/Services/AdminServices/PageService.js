class PageService {
  async createPage(banners, products, pageObj) {
    if (banners && banners.length > 0) {
      banners = banners.map((banner, index) => ({
        img: `${process.env.API}/public/${banner.filename}`,
        navigateTo: `/bannerClicked?categoryId=${pageObj.category}&type=${pageObj.type}`,
      }));
    }
    if (products && products.length > 0) {
      req.body.products = products.map((product, index) => ({
        img: `${process.env.API}/public/${product.filename}`,
        navigateTo: `/productClicked?categoryId=${pageObj.category}&type=${pageObj.type}`,
      }));
    }
    const page = await Page.findOne({ category: category });
    if (page) {
      const updatedPage = await Page.findOneAndUpdate(
        { category: category },
        pageObj
      );
      if (updatedPage) {
        return updatedPage;
      }
    } else {
      const page = new Page(pageObj);

      page.save();

      return page;
    }
  }

  async getPage(category, type) {
    if (type === "page") {
      const page = await Page.findOne({ category: category });
      return page;
    }
  }
}
module.exports = PageService;
