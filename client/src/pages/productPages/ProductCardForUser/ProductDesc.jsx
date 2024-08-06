import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../redux/reducers/authReducer";
import { fetchProductDetails } from "../../../redux/reducers/productReducer";
import { addCartItem } from "../../../redux/reducers/cartItemReducer";
import Loader from "../../../UI/Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDesc = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();

  // Redux state
  const { product, loading, error, message } = useSelector(
    (state) => state.product
  );
  const user = useSelector(getUser);

  // Local state for quantity
  const [quantity, setQuantity] = useState(1);

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

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Sign In to add product to cart.");
      return;
    }
    try {
      await dispatch(addCartItem({userId:user._id, productId, quantity })).unwrap();
      toast.success("Product added to cart successfully!");
    } catch (err) {
      toast.error(err.message || "Failed to add product to cart.");
    }
  };

  // Quantity adjustment handlers
  const handleIncrease = () => setQuantity(prev => prev + 1);
  const handleDecrease = () => setQuantity(prev => Math.max(1, prev - 1));

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
        <Col lg={6} md={8} sm={12}>
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
              <p>Price Range: ₹{minPrice} - ₹{maxPrice}</p>
              <p>Price per Kg: ₹{pricePerKg}</p>

              {/* Mobile View Adjustments */}
              <div className="d-flex flex-column align-items-center mb-2">
                <div className="d-flex mb-2">
                  <Button
                    variant="outline-secondary"
                    onClick={handleDecrease}
                    disabled={quantity <= 1}
                    className="mx-1"
                  >
                    -
                  </Button>
                  <Form.Control
                    type="text"
                    value={quantity}
                    readOnly
                    className="mx-2 text-center"
                    style={{ width: "60px" }}
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={handleIncrease}
                    className="mx-1"
                  >
                    +
                  </Button>
                </div>
                <div className="d-flex justify-content-between w-100">
                  <Button
                    variant="secondary"
                    href="/products"
                    className="w-50"
                  >
                    Back to Products
                  </Button>
                  <Button
                    onClick={handleAddToCart}
                    className="btn btn-success w-50"
                    disabled={loading}
                    style={{ marginLeft: "10px" }}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDesc;
