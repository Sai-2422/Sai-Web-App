import React, { useState } from "react";
import { Card, Button, Col, Row, Modal } from "react-bootstrap";
import { format } from "date-fns";
import { calculateRemainingAmount } from "../../../utils/razorpayRefund/razorpayRefund";

const ProductOrderCard = ({ order, onDeleteOrder, onCancelOrder }) => {
  const [showWarning, setShowWarning] = useState(false);

  const {
    shippingInfo,
    productId,
    quantity,
    amount,
    createdAt,
    status,
    refunded,
  } = order;

  // Function to get background color based on status
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "#fff3cd"; // Light yellow for pending
      case "shipped":
        return "#d1ecf1"; // Light blue for shipped
      case "delivered":
        return "#d4edda"; // Light green for delivered
      case "cancelled":
        return "#f8d7da"; // Light red for cancelled
      default:
        return "#ffffff"; // Default white background
    }
  };

  // Ensure the createdAt date is valid before formatting
  const formattedDate = createdAt
    ? format(new Date(createdAt), "dd/MM/yyyy")
    : "Invalid Date";

  // Calculate expected delivery date
  const expectedDeliveryDate = createdAt
    ? format(
        new Date(
          new Date(createdAt).setDate(new Date(createdAt).getDate() + 15)
        ),
        "dd/MM/yyyy"
      )
    : "Invalid Date";

  // Example assuming productId is an object and productImg is a property of it
  const productImg = productId?.productImg;
  const productTitle = productId?.title;

  // Inline styles
  const cardStyles = {
    marginBottom: "1.5rem",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e1e1e1",
    borderRadius: "0.375rem", // Rounded corners
    backgroundColor: getStatusColor(status), // Background color based on status
  };

  const imageContainerStyles = {
    padding: "1rem",
    borderRight: "1px solid #e1e1e1",
  };

  const imageStyles = {
    maxHeight: "200px",
    objectFit: "cover",
    borderRadius: "0.375rem", // Rounded corners for the image
  };

  const buttonStyles = {
    marginTop: "1rem",
    marginRight: "10px", // Add some spacing between buttons
  };

  // Handle the cancel order process
  const handleCancelOrder = () => {
    setShowWarning(true);
  };

  const confirmCancelOrder = () => {
    setShowWarning(false);
    onCancelOrder(); // Call the passed-in onCancelOrder function
  };

  return (
    <>
      <Card style={cardStyles}>
        <Row className="g-0">
          <Col md={4} style={imageContainerStyles}>
            {productImg ? (
              <Card.Img
                variant="top"
                src={productImg}
                alt="Product"
                style={imageStyles}
              />
            ) : (
              <Card.Body className="d-flex align-items-center justify-content-center text-muted">
                <Card.Text>No product image</Card.Text>
              </Card.Body>
            )}
          </Col>
          <Col md={8}>
            <Card.Body>
              <Card.Subtitle className="mb-2 text-muted">
                Product Information:
              </Card.Subtitle>
              <Card.Text>
                <strong>Product Name:</strong> {productTitle}
              </Card.Text>
              <Card.Text>
                <strong>Quantity:</strong> {quantity}
              </Card.Text>
              <Card.Text>
                <strong>Status:</strong> {status}
              </Card.Text>
              <Card.Text>
                <strong>Paid Amount:</strong> ₹{amount}
              </Card.Text>
              <Card.Text>
                <strong>Order Date:</strong> {formattedDate}
              </Card.Text>
              <Card.Text>
                <strong>Expected Delivery Date:</strong> {expectedDeliveryDate}
              </Card.Text>
              {refunded ? (
                <Card.Text>
                  <strong>Refunded:</strong>{" "}
                  {refunded
                    ? "Refund is in processing; expected within 3-7 working days."
                    : null}
                </Card.Text>
              ) : null}
              <Card.Subtitle className="mt-3 mb-2 text-muted">
                Shipping Information:
              </Card.Subtitle>
              <Card.Text>
                <strong>Address:</strong> {shippingInfo.address}
              </Card.Text>
              <Card.Text>
                <strong>City:</strong> {shippingInfo.city}
              </Card.Text>
              <Card.Text>
                <strong>State:</strong> {shippingInfo.state}
              </Card.Text>
              <Card.Text>
                <strong>Pincode:</strong> {shippingInfo.pincode}
              </Card.Text>

              <Button
                variant="danger"
                style={buttonStyles}
                onClick={() => onDeleteOrder()}
              >
                Delete Order
              </Button>
              <Button
                variant="warning"
                style={buttonStyles}
                onClick={handleCancelOrder}
                disabled={status === "cancelled"}
              >
                Cancel Order
              </Button>
            </Card.Body>
          </Col>
        </Row>
      </Card>

      {/* Modal for Cancel Order Warning */}
      <Modal show={showWarning} onHide={() => setShowWarning(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Cancellation Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Please note that the amount you paid will be refunded to you.
            However, Razorpay charges will be deducted from your refund amount.
            The refunded amount will be{" "}
            <strong>₹ {calculateRemainingAmount(amount)}</strong>.
          </p>
          <p>
            For more information or assistance, please contact our admin: <br />
            <strong>Harshad Kanchangire</strong> <br />
            <strong>Phone:</strong> 8767578894
          </p>
          <p>
            Do you accept these terms and wish to proceed with the cancellation?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowWarning(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={confirmCancelOrder}>
            I Accept
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductOrderCard;
