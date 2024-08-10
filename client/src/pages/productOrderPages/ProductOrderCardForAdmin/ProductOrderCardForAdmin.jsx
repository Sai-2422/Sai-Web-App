import React, { useState } from "react";
import { Card, Button, Col, Row, Form, Modal } from "react-bootstrap";
import { format } from "date-fns";

const ProductOrderCardForAdmin = ({
  order,
  onDeleteOrder,
  onManualRefund,
  onUpdateOrderStatus,
}) => {
  const [selectedStatus, setSelectedStatus] = useState(order.status);
  const [showUserModal, setShowUserModal] = useState(false);

  const defaultProfileImage =
    "https://res.cloudinary.com/dqy2ts9h6/image/upload/v1722082558/SAI%20WebApp/profileImage.webp";

  const {
    shippingInfo,
    productId,
    userId,
    quantity,
    amount,
    createdAt,
    status,
    refunded,
    paymentId, // Add paymentId if available in the order object
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
  const userProfile = userId.profileImg || defaultProfileImage;

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

  // Handle the status change
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleUpdateStatus = () => {
    onUpdateOrderStatus(selectedStatus);
  };

  const handleRefund = () => {
    onManualRefund(paymentId, amount);
  };

  // Handle the user modal
  const handleViewUserDetails = () => {
    setShowUserModal(true);
  };

  const handleCloseUserModal = () => {
    setShowUserModal(false);
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
              <div
                className="d-flex align-items-center"
                style={{ marginTop: "1rem" }}
              >
                <Form.Label style={{ marginRight: "10px" }}>Status:</Form.Label>
                <Form.Group controlId="orderStatus" style={{ width: "150px" }}>
                  <Form.Control
                    as="select"
                    value={selectedStatus}
                    onChange={handleStatusChange}
                  >
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </Form.Control>
                </Form.Group>
              </div>
              <Button
                variant="success"
                style={buttonStyles}
                onClick={handleUpdateStatus}
              >
                Update Status
              </Button>
              <Button
                variant="info"
                style={buttonStyles}
                onClick={handleViewUserDetails}
              >
                View User Details
              </Button>
              <Button
                variant="warning"
                style={buttonStyles}
                onClick={handleRefund}
              >
                Manual Refund
              </Button>

              <Button
                variant="danger"
                style={buttonStyles}
                onClick={() => onDeleteOrder()}
              >
                Delete Order
              </Button>
            </Card.Body>
          </Col>
        </Row>
      </Card>

      {/* User Details Modal */}
      <Modal show={showUserModal} onHide={handleCloseUserModal}>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {userId && (
            <>
              <Card>
                <Card.Img
                  variant="top"
                  src={userProfile}
                  alt="User Profile"
                  style={{ maxHeight: "200px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Text>
                    <strong>Name:</strong> {userId.name}
                  </Card.Text>
                  <Card.Text>
                    <strong>Email:</strong> {userId.email}
                  </Card.Text>
                  <Card.Text>
                    <strong>Contact Number:</strong> {userId.contactNumber}
                  </Card.Text>
                  <Card.Text>
                    <strong>Gender:</strong> {userId.gender}
                  </Card.Text>
                  <Card.Text>
                    <strong>Address:</strong> {userId.address}
                  </Card.Text>
                </Card.Body>
              </Card>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUserModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductOrderCardForAdmin;
