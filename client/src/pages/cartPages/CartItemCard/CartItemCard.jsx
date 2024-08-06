import React, { useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import PaymentButton from "../../../components/Payment/PaymentButton";
import styles from "./CartItemCard.module.css";

const CartItemCard = ({
  item,
  onDeleteItem,
  onIncreaseQuantity,
  onDecreaseQuantity,
}) => {
  const [quantity, setQuantity] = useState(item.quantity || 1);

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

  return (
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
            <Card.Text>Price: ₹{item.productId.minPrice} / Per Piece</Card.Text>
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
              <PaymentButton
                amount={item.productId.minPrice * quantity}
                description={`Purchase of Product ${item.productTitle}`}
              />
            </div>
            <div className="mt-2">
              <Button variant="danger" onClick={onDeleteItem}>
                Remove from Cart
              </Button>
            </div>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default CartItemCard;
