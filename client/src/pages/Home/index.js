import React from "react";
import Layout from "../../components/Layout/UserLayout";

import { Carousel } from "react-bootstrap";

import carusel3 from "../../images/carusel3.jpg";
import carusel4 from "../../images/carusel4.jpg";
import carusel5 from "../../images/carusel5.jpg";

/**
 * @author
 * @function HomePage
 **/

const Home = (props) => {
  return (
    <div style={{ marginTop: "10px" }}>
      <Layout>
        home
        {/*<Carousel>
          <Carousel.Item interval={3000}>
            <img className="w-100" src={carusel3} alt="First slide" />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={2000}>
            <img className=" w-100" src={carusel4} alt="Third slide" />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={2000}>
            <img className=" w-100" src={carusel5} alt="Third slide" />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>{" "}*/}
      </Layout>
    </div>
  );
};

export default Home;
