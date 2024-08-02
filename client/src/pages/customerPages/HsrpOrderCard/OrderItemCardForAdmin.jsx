import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import styles from "./OrderItemCardForAdmin.module.css";

import Loader from "../../../UI/Loader";
import { getLoadingState } from "../../../redux/reducers/orderReducer";

const defaultProfileImage =
  "https://res.cloudinary.com/dqy2ts9h6/image/upload/v1722082558/SAI%20WebApp/profileImage.webp";

const OrderItemCardForAdmin = ({ order, onDeleteOrder, onGetDetails }) => {
  const loading = useSelector(getLoadingState);

  return (
    <Card className={styles.orderCard}>
      <Card.Body>
        <Row>
          <Col xs={12} sm={4} className="text-center mb-3 mb-sm-0">
            <img
              src={order?.userId?.profileImg || defaultProfileImage}
              alt={`${order.name}`}
              className={styles.orderImage}
            />
          </Col>
          <Col xs={12} sm={8}>
            <Card.Title>Name: {order.userId?.name}</Card.Title>
            <Card.Text>Registration No: {order.registrationNo}</Card.Text>
            <div className={styles.buttonGroup}>
              {loading ? (
                <Loader />
              ) : (
                <>
                  <Button variant="primary" onClick={onGetDetails}>
                    Get Details
                  </Button>
                  <Button variant="danger" onClick={onDeleteOrder}>
                    Delete
                  </Button>
                </>
              )}
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default OrderItemCardForAdmin;
