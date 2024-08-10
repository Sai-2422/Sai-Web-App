import React, { useState } from "react";
import { Card, Button, Row, Col, Modal, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import styles from "./CartItemCard.module.css";
import { getUser } from "../../../redux/reducers/authReducer";
import PaymentButton from "../../../components/Payment/PaymentButton";

const CartItemCard = ({
  item,
  onDeleteItem,
  onIncreaseQuantity,
  onDecreaseQuantity,
}) => {
  const user = useSelector(getUser);
  const [quantity, setQuantity] = useState(item.quantity || 1);
  const [showModal, setShowModal] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleIncreaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    if (onIncreaseQuantity) onIncreaseQuantity(item._id, newQuantity);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      if (onDecreaseQuantity) onDecreaseQuantity(item._id, newQuantity);
    }
  };

  const handleOrderNow = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({
      ...shippingInfo,
      [name]: value,
    });
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please sign in as a customer to book a product order.");
      return;
    }

    // Validate shippingInfo
    if (
      !shippingInfo.address ||
      !shippingInfo.city ||
      !shippingInfo.state ||
      !shippingInfo.pincode
    ) {
      toast.error("Please complete all shipping information.");
      return;
    }

    // Directly initiate payment
    initiatePayment();
  };

  const initiatePayment = () => {
    const paymentButtonElement = document.getElementById("payment-button");
    if (paymentButtonElement) {
      paymentButtonElement.click();
    }
    handleCloseModal();
  };

  
  const orderData = {
    shippingInfo: {
      address: shippingInfo.address,
      city: shippingInfo.city,
      state: shippingInfo.state,
      pincode: parseInt(shippingInfo.pincode, 10), 
    },
    quantity: quantity,
    productId: item.productId._id, 
    userId: user._id, 
    amount: item.productId.minPrice * quantity,
  };

  return (
    <>
      <Card className={`mb-3 ${styles.card}`}>
        <Row className="no-gutters">
          <Col md={4}>
            <Card.Img
              variant="top"
              src={item.productId.productImg}
              alt={item.productTitle}
              className={styles.cardImage}
            />
          </Col>
          <Col md={8}>
            <Card.Body>
              <Card.Title>{item.productTitle}</Card.Title>
              <Card.Text>
                Price: ₹{item.productId.minPrice} / Per Piece
              </Card.Text>
              <Card.Text>Quantity: {quantity}</Card.Text>
              <Button
                variant="outline-secondary"
                onClick={handleDecreaseQuantity}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <Button
                variant="outline-secondary"
                onClick={handleIncreaseQuantity}
                className="ms-2"
              >
                +
              </Button>
              <div className="mt-2">
                <Button
                  variant="primary"
                  onClick={handleOrderNow}
                  style={{ width: "175px" }}
                >
                  Order Now
                </Button>
              </div>

              <div className="mt-2">
                <Button
                  variant="danger"
                  onClick={onDeleteItem}
                  style={{ width: "175px" }}
                >
                  Remove from Cart
                </Button>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleOrderSubmit}>
            <Form.Group controlId="formProductTitle">
              <Form.Label>Product</Form.Label>
              <Form.Control type="text" value={item.productTitle} readOnly />
            </Form.Group>
            <Form.Group controlId="formProductQuantity" className="mt-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="number" value={quantity} readOnly />
            </Form.Group>
            <Form.Group controlId="formShippingAddress" className="mt-3">
              <Form.Label>
                Shipping Address<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter shipping address"
                name="address"
                value={shippingInfo.address}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formShippingCity" className="mt-3">
              <Form.Label>
                City<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter city"
                name="city"
                value={shippingInfo.city}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formShippingState" className="mt-3">
              <Form.Label>
                State<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter state"
                name="state"
                value={shippingInfo.state}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formShippingPincode" className="mt-3">
              <Form.Label>
                Pincode<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter pincode"
                name="pincode"
                value={shippingInfo.pincode}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <div className="mt-2">
              <PaymentButton
                amount={item.productId.minPrice * quantity}
                description={`Purchase of Product ${item.productTitle}`}
                formData={orderData}
                id="payment-button"
                payfor="PRODUCT"
              />
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CartItemCard;
