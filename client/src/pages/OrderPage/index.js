import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrders } from "../../actions";
import Layout from "../../components/Layout";
import { generatePublicUrl } from "../../urlConfig";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "react-bootstrap";

import "./style.css";
//import { Breed } from "../../components/MaterialUI";

/**
 * @author
 * @function OrderPage
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

const OrderPage = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  console.log(user);

  return (
    <Layout>
      <div style={{ padding: "10px", marginTop: "50px" }}>
        <h1>My Orders</h1>
        <Container>
          <Grid container spacing={4}>
            {user.orders.map((order) => {
              return order.items.map((item) => (
                <Grid item key={order._id} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <Link
                      style={{
                        cursor: "pointer",
                        color: "#343A40",
                        textDecoration: "none",
                      }}
                      to={`/order_details/${order._id}`}
                    >
                      <img
                        className="orderImg"
                        src={generatePublicUrl(
                          item.productId.productPictures[0].img
                        )}
                      />

                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        style={{ margin: "10px 0 10px 0 " }}
                        align="center"
                      >
                        {item.productId.name}
                      </Typography>
                    </Link>
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        Price : $ {item.payablePrice}
                      </Typography>
                    </CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      style={{ margin: "10px 0 10px 0 " }}
                      align="center"
                    >
                      {order.paymentStatus}
                    </Typography>
                  </Card>
                </Grid>
              ));
            })}
          </Grid>
        </Container>
      </div>
    </Layout>
  );
};

export default OrderPage;
