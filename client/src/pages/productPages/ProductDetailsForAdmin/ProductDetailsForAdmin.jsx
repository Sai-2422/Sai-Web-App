import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductDetails } from "../../../redux/reducers/productReducer";
import { Card, Container, Row, Col, Image } from "react-bootstrap";
import Loader from "../../../UI/Loader";
import { toast } from "react-toastify";

const defaultProductImage =
  "https://res.cloudinary.com/dqy2ts9h6/image/upload/v1722082653/SAI%20WebApp/productImage.jpg";

const ProductDetailsForAdmin = () => {
  const { productId } = useParams();

  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.product);
  const loading = useSelector((state) => state.product.loading);
  const error = useSelector((state) => state.product.error);
  const message = useSelector((state) => state.product.message);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductDetails(productId));
    }
  }, [dispatch, productId]);

  useEffect(() => {
    if (error) {
      toast.error(
        message || "An error occurred while fetching product details."
      );
    }
  }, [error, message]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Container className="my-3">
      {product ? (
        <Card>
          <Card.Body>
            <Row>
              <Col xs={12} sm={4} className="text-center mb-3 mb-sm-0">
                <Image
                  src={product.productImg || defaultProductImage}
                  alt={`${product.title}`}
                  roundedCircle
                  fluid
                  style={{ width: "100px", height: "100px" }}
                />
              </Col>
              <Col xs={12} sm={8} className="my-3">
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>Description: {product.description}</Card.Text>
                <Card.Text>
                  Price: ₹{product.minPrice}
                  {" - "}₹{product.maxPrice}
                </Card.Text>
                <Card.Text>Price per KG: ₹{product.pricePerKg}</Card.Text>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ) : (
        <p>Product not found</p>
      )}
    </Container>
  );
};

export default ProductDetailsForAdmin;
