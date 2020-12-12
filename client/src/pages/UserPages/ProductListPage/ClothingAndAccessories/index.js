import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug } from "../../../../actions";
import { generatePublicUrl } from "../../../../urlConfig";
import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "react-bootstrap";

import "./style.css";

/**
 * @author
 * @function ClothingAndAccessories
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

const ClothingAndAccessories = (props) => {
  const classes = useStyles();
  const product = useSelector((state) => state.userProduct);
  const dispatch = useDispatch();

  useEffect(() => {
    const { match } = props;
    dispatch(getProductsBySlug(match.params.slug));
  }, []);

  return (
    <div style={{ padding: "10px", marginTop: "70px" }}>
      <h1>Hello from product Page</h1>
      <Container>
        <Grid container spacing={4}>
          {product.products.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <Link to={`/${product.slug}/${product._id}/p`}>
                  <img
                    src={generatePublicUrl(product.productPictures[0].img)}
                  />
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

                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Price : ${product.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default ClothingAndAccessories;
