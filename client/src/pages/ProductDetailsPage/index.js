import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetailsById } from "../../actions";
import Layout from "../../components/Layout/UserLayout";
import { IoIosStar, IoMdCart } from "react-icons/io";
import { Button } from "react-bootstrap";
import "./style.css";
import { generatePublicUrl } from "../../urlConfig";
import { addToCart } from "../../actions";

/**
 * @author
 * @function ProductDetailsPage
 **/

const ProductDetailsPage = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.userProduct);

  useEffect(() => {
    const { productId } = props.match.params;
    const payload = {
      params: {
        productId,
      },
    };
    dispatch(getProductDetailsById(payload));
  }, []);

  if (Object.keys(product.productDetails).length === 0) {
    return null;
  }

  return (
    <div style={{ padding: "10px", marginTop: "50px" }}>
      <Layout>
        <div
          className="productDescriptionContainer"
          style={{ padding: "10px", marginTop: "50px" }}
        >
          <div className="verticalImageStack">
            {product.productDetails.productPictures.map((thumb, index) => (
              <div className="thumbnail">
                <img
                  style={{ cursor: "pointer" }}
                  src={generatePublicUrl(thumb.img)}
                  alt={thumb.img}
                />
              </div>
            ))}
          </div>
          <div className="flexRow">
            <div className="productDescContainer">
              <div className="productDescImgContainer">
                <img
                  style={{ cursor: "pointer" }}
                  src={generatePublicUrl(
                    product.productDetails.productPictures[0].img
                  )}
                  alt={`${product.productDetails.productPictures[0].img}`}
                />
              </div>

              <div className="flexRow">
                <Button
                  style={{
                    marginTop: "10px",
                  }}
                  icon={<IoMdCart />}
                  onClick={() => {
                    const { _id, name, price } = product.productDetails;
                    const img = product.productDetails.productPictures[0].img;
                    dispatch(addToCart({ _id, name, price, img }));
                    props.history.push(`/cart`);
                  }}
                >
                  ADD TO CART
                </Button>
              </div>
            </div>
          </div>
          <div>
            {/* product description */}
            <div
              style={{
                marginLeft: "40px",
              }}
              className="productDetails"
            >
              <p className="productTitle">{product.productDetails.name}</p>
              <div>
                <span className="ratingCount">
                  3.5 <IoIosStar />
                </span>
                <span className="ratingNumbersReviews">
                  42,500 Ratings & 2,310 Reviews
                </span>
              </div>
              <div className="extraOffer">Extra $ 4500 off </div>
              <div className="flexRow priceContainer">
                <span className="price">$ {product.productDetails.price}</span>
                <span className="discount" style={{ margin: "0 10px" }}>
                  22% off
                </span>
              </div>
              <div>
                <p
                  style={{
                    color: "#212121",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  Available Offers
                </p>
                <p style={{ display: "flex" }}>
                  <span
                    style={{
                      width: "100px",
                      fontSize: "12px",
                      color: "#878787",
                      fontWeight: "600",
                      marginRight: "20px",
                    }}
                  >
                    Description
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#212121",
                    }}
                  >
                    {product.productDetails.description}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default ProductDetailsPage;
