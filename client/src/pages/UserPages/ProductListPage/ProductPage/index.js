import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductPage } from "../../../../actions";
import getParams from "../../../../utils/getParams";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { generatePublicUrl } from "../../../../urlConfig";

import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "react-bootstrap";

/**
 * @author
 * @function ProductPage
 **/

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const ProductPage = (props) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const product = useSelector((state) => state.userProduct);
  const { page } = product;

  useEffect(() => {
    const params = getParams(props.location.search);
    console.log({ params });
    const payload = {
      params,
    };
    dispatch(getProductPage(payload));
  }, []);

  return (
    <div>
      {/*<h3>{page.title}</h3>*/}
      <Carousel renderThumbs={() => {}}>
        {page.banners &&
          page.banners.map((banner, index) => (
            <a key={index} style={{ display: "block" }}>
              <img src={banner.img} alt="" />
            </a>
          ))}
      </Carousel>

      <Container style={{ padding: "10px", marginTop: "70px" }}>
        <h6>Related Product</h6>
        <Grid container spacing={4}>
          {page.products &&
            page.products.map((product, index) => (
              <Grid item key={product._id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <Link to={`/${product.slug}/${product._id}/p`}>
                    <img src={product.img} />
                  </Link>
                  <Link
                    style={{
                      cursor: "pointer",
                      color: "#343A40",
                      textDecoration: "none",
                    }}
                    to={`/${product.slug}/${product._id}/p`}
                  >
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      style={{ margin: "10px 0 10px 0 " }}
                      align="center"
                    >
                      {product.name}
                    </Typography>
                  </Link>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Container>
    </div>
  );
};

export default ProductPage;
