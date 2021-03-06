import React, { useState, useEffect } from "react";
import Modal from "../../../components/UI/Modal";
import Layout from "../../../components/Layout/AdminLayout";
import Input from "../../../components/UI/Input";
import { Container, Row, Col, Form } from "react-bootstrap";
import linearCategories from "../../../helpers/linearCategories";
import { useSelector, useDispatch } from "react-redux";
import { createPage } from "../../../actions";
import { Button } from "react-bootstrap";

/**
 * @author
 * @function NewPage
 **/

const NewPage = (props) => {
  const [createModal, setCreateModal] = useState(false);
  const [title, setTitle] = useState("");
  const category = useSelector((state) => state.category);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("");
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const page = useSelector((state) => state.userProduct);

  useEffect(() => {
    setCategories(linearCategories(category.categories));
  }, [category]);

  useEffect(() => {
    if (!page.loading) {
      setCreateModal(false);
      setTitle("");
      setCategoryId("");
      setDesc("");
      setProducts([]);
      setBanners([]);
    }
  }, [page]);

  const onCategoryChange = (e) => {
    const category = categories.find(
      (category) => category.value == e.target.value
    );
    setCategoryId(e.target.value);
    setType(category.type);
  };

  const handleBannerImages = (e) => {
    setBanners([...banners, e.target.files[0]]);
  };

  const handleProductImages = (e) => {
    setProducts([...products, e.target.files[0]]);
  };

  const submitPageForm = (e) => {
    if (title === "") {
      alert("Title is required");
      setCreateModal(false);
      return;
    }

    if (desc === "") {
      alert("description is required");
      setCreateModal(false);
      return;
    }

    const form = new FormData();
    form.append("title", title);
    form.append("description", desc);
    form.append("category", categoryId);
    form.append("type", type);
    banners.forEach((banner, index) => {
      form.append("banners", banner);
    });
    products.forEach((product, index) => {
      form.append("products", product);
    });

    dispatch(createPage(form));
  };

  const renderCreatePageModal = () => {
    return (
      <Modal
        show={createModal}
        modalTitle={"Create New Page"}
        handleClose={() => setCreateModal(false)}
        onSubmit={submitPageForm}
      >
        <Container>
          <Form.Group>
            <Row>
              <Col>
                <Input
                  label="Category"
                  type="select"
                  value={categoryId}
                  onChange={onCategoryChange}
                  options={categories}
                  placeholder={"Select Category"}
                />
              </Col>
            </Row>
          </Form.Group>

          <Form.Group>
            <Row>
              <Col>
                <Input
                  label="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={"Page Title"}
                  className=""
                />
              </Col>
            </Row>
          </Form.Group>

          <Form.Group>
            <Row>
              <Col>
                <Input
                  label="Discription"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder={"Page Desc"}
                  className=""
                />
              </Col>
            </Row>
          </Form.Group>

          <Form.Group>
            <Row>
              <Col>
                <Input
                  label="Banners"
                  className="form-control"
                  type="file"
                  name="banners"
                  onChange={handleBannerImages}
                />
              </Col>
            </Row>
            {banners.length > 0
              ? banners.map((banner, index) => (
                  <Row key={index}>
                    <Col>{banner.name}</Col>
                  </Row>
                ))
              : null}
          </Form.Group>

          <Form.Group>
            <Row>
              <Col>
                <Input
                  label="Products"
                  className="form-control"
                  type="file"
                  name="products"
                  onChange={handleProductImages}
                />
              </Col>
            </Row>
            {products.length > 0
              ? products.map((product, index) => (
                  <Row key={index}>
                    <Col>{product.name}</Col>
                  </Row>
                ))
              : null}
          </Form.Group>
        </Container>
      </Modal>
    );
  };

  return (
    <Layout sidebar>
      {page.loading ? (
        <p>Creating Page...please wait</p>
      ) : (
        <>
          {renderCreatePageModal()}
          <Button
            size="lg"
            onClick={() => setCreateModal(true)}
            variant="success"
          >
            {" "}
            Create Page
          </Button>{" "}
        </>
      )}
    </Layout>
  );
};

export default NewPage;
