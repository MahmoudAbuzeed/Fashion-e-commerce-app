import React from "react";
import Layout from "../../../components/Layout/UserLayout";
import getParams from "../../../utils/getParams";
import ClothingAndAccessories from "./ClothingAndAccessories";
import ProductPage from "./ProductPage";
import "./style.css";

/**
 * @author
 * @function ProductListPage
 **/

const ProductListPage = (props) => {
  const renderProduct = () => {
    const params = getParams(props.location.search);
    let content = null;
    switch (params.type) {
      case "page":
        content = <ProductPage {...props} />;
        break;
      default:
        content = <ClothingAndAccessories {...props} />;
    }

    return content;
  };

  return (
    <div
      style={{
        marginTop: "70px",
      }}
    >
      <Layout>{renderProduct()}</Layout>
    </div>
  );
};

export default ProductListPage;
