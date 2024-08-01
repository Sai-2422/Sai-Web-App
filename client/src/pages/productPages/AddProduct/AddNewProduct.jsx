import styles from "./AddProduct.module.css";
import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addNewProduct } from "../../../redux/reducers/productReducer";
import Loader from "../../../UI/Loader";

const defaultProductImage =
  "https://res.cloudinary.com/dqy2ts9h6/image/upload/v1722082653/SAI%20WebApp/productImage.jpg";
const AddProduct = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.product.loading);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    minPrice: 125000,
    maxPrice: 250000,
    pricePerKg: 90,
    productImg: null,
  });

  const [previewImg, setPreviewImg] = useState(defaultProductImage);
  const [productImg, setProductImg] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Product image size should be less than 2MB");
        return;
      }
      setProductImg(file);
      setPreviewImg(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("minPrice", Number(formData.minPrice));
    data.append("maxPrice", Number(formData.maxPrice));
    data.append("pricePerKg", Number(formData.pricePerKg));
    if (productImg) {
      data.append("productImg", productImg);
    }

    dispatch(addNewProduct(data))
      .unwrap()
      .then(() => {
        toast.success("Product added successfully!");
        handleReset();
      })
      .catch((err) => {
        console.log("err:" + err);
        console.log("err.message:" + err.mesage);
        toast.error(err.message || "Failed to add product. Please try again.");
      });
  };

  const handleReset = () => {
    setFormData({
      title: "",
      description: "",
      minPrice: 0,
      maxPrice: 0,
      pricePerKg: 0,
    });
    setPreviewImg(defaultProductImage);
    setProductImg(null);
  };

  return (
    <Container className="my-3" style={{ minHeight: "100vh" }}>
      <Row className="w-100 justify-content-center">
        <Col
          xs={12}
          sm={11}
          md={10}
          lg={9}
          className={`${styles.gradientBackground} p-4 rounded`}
        >
          <h2 className="text-center">Add New Product</h2>
          {loading && <Loader />}
          <div className="text-center mb-3">
            <Image
              src={previewImg}
              roundedCircle
              alt="Product Preview"
              className={styles.imagePreview}
            />
          </div>
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Form.Group className="mb-3" controlId="formBasicTitle">
              <Form.Label>
                Product Title <span className={styles.required}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter product title"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDescription">
              <Form.Label>
                Product Description <span className={styles.required}>*</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter product description"
                required
                style={{ height: "100px" }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPriceRange">
              <Form.Label>
                Price Range <span className={styles.required}>*</span>
              </Form.Label>
              <Row>
                <Col xs={6}>
                  <Form.Control
                    type="number"
                    name="minPrice"
                    value={formData.minPrice}
                    onChange={handleChange}
                    placeholder="Min Price"
                    required
                  />
                </Col>
                <Col xs={1} className="text-center">
                  to
                </Col>
                <Col xs={5}>
                  <Form.Control
                    type="number"
                    name="maxPrice"
                    value={formData.maxPrice}
                    onChange={handleChange}
                    placeholder="Max Price"
                    required
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPricePerKg">
              <Form.Label>
                Price per KG <span className={styles.required}>*</span>
              </Form.Label>
              <Form.Control
                type="number"
                name="pricePerKg"
                value={formData.pricePerKg}
                onChange={handleChange}
                placeholder="Enter price per kg"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formProductImg">
              <Form.Label>
                Product Image (max 2MB)<span className={styles.maybe}>*</span>
              </Form.Label>
              <Form.Control
                type="file"
                name="productImg"
                onChange={handleImageChange}
              />
            </Form.Group>
            <div className={styles.buttonContainer}>
              <Button variant="success" type="submit" disabled={loading}>
                {loading ? "Adding..." : "Add Product"}
              </Button>
              <Button variant="secondary" type="button" onClick={handleReset}>
                Reset
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddProduct;
