import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchProductDetails,
  updateProduct,
} from "../../../redux/reducers/productReducer";
import { Form, Button, Container, Image, Row, Col } from "react-bootstrap";
import Loader from "../../../UI/Loader";
import { toast } from "react-toastify";
import styles from "./UpdateProductByAdmin.module.css";

const defaultProductImage =
  "https://res.cloudinary.com/dqy2ts9h6/image/upload/v1722082653/SAI%20WebApp/productImage.jpg";

const UpdateProductByAdmin = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector((state) => state.product.product);
  const loading = useSelector((state) => state.product.loading);

  const [formData, setFormData] = useState({});
  const [removeImage, setRemoveImage] = useState(false);
  const [productImg, setProductImg] = useState(null);
  const [previewImg, setPreviewImg] = useState(defaultProductImage);

  useEffect(() => {
    dispatch(fetchProductDetails(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title,
        description: product.description,
        minPrice: product.minPrice,
        maxPrice: product.maxPrice,
        pricePerKg: product.pricePerKg,
      });
      setPreviewImg(product.productImg || defaultProductImage);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Product image size should be less than 2MB");
        return;
      }
      setProductImg(file);
      setPreviewImg(URL.createObjectURL(file));
      setRemoveImage(false);
    }
  };

  const handleRemoveImage = () => {
    setRemoveImage(true);
    setPreviewImg(defaultProductImage);
    setProductImg(null);
    document.getElementById("formProductImg").value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("minPrice", formData.minPrice);
    data.append("maxPrice", formData.maxPrice);
    data.append("pricePerKg", formData.pricePerKg);

    if (productImg) {
      data.append("productImg", productImg);
    }

    if (removeImage) {
      data.append("removeImage", true);
    }

    dispatch(updateProduct({ productId, productData: data }))
      .unwrap()
      .then(() => {
        toast.success("Product updated successfully");
        handleReset();
        navigate("/admin/products");
      })
      .catch((err) => {
        toast.error(err.message || "Failed to update product");
      });
  };

  const handleReset = () => {
    setFormData({
      title: "",
      description: "",
      minPrice: "",
      maxPrice: "",
      pricePerKg: "",
    });
    setPreviewImg(defaultProductImage);
    setProductImg(null);
    setRemoveImage(false);
  };

  if (loading) {
    return <Loader />;
  }

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
          <h2 className="text-center">Update Product Details</h2>
          <div className="text-center mb-3">
            <Image
              src={previewImg}
              roundedCircle
              alt="Product Preview"
              className={styles.imagePreview}
            />
            <Form.Group className="mt-3" controlId="formRemoveImage">
              <Button variant="danger" onClick={handleRemoveImage}>
                Remove Product Image
              </Button>
            </Form.Group>
          </div>
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Form.Group className="mb-3" controlId="formBasicTitle">
              <Form.Label>
                Title <span className={styles.required}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter title"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDescription">
              <Form.Label>
                Description <span className={styles.required}>*</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter description"
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
                Price Per Kg <span className={styles.required}>*</span>
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
                Update Details
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

export default UpdateProductByAdmin;
