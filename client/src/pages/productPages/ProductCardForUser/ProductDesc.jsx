import React, { useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "../../../redux/reducers/productReducer";
import Loader from "../../../UI/Loader";
import { toast } from "react-toastify";

const ProductDesc = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();

  // Redux state
  const { product, loading, error, message } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        await dispatch(fetchProductDetails(productId)).unwrap();
      } catch (err) {
        toast.error(err.message);
      }
    };

    fetchProduct();
  }, [productId, dispatch]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {message}</div>;
  }

  if (!product) {
    return (
      <div
        style={{
          color: "red",
          fontSize: "20px",
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        Product not found
      </div>
    );
  }

  const { title, description, minPrice, maxPrice, pricePerKg, productImg } =
    product;

  return (
    <Container className="mt-3 mb-3">
      <Row className="justify-content-center">
        <Col lg={6}>
          <Card className="border-info mb-3">
            <Card.Img
              variant="top"
              src={productImg}
              alt={title}
              style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
              }}
            />
            <hr />
            <Card.Body>
              <Card.Title>{title}</Card.Title>
              <Card.Text>{description}</Card.Text>
              <p>
                Price Range: ₹{minPrice} - ₹{maxPrice}
              </p>
              <p>Price per Kg: ₹{pricePerKg}</p>
              {/* <Button variant="secondary" href="/products">
                Back to Products
              </Button> */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDesc;
