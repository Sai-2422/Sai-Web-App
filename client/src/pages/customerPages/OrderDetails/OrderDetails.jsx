import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import {
  getHSRPOrder,
  getError,
  getLoadingState,
  getErrorMessage,
  fetchHSRPOrderDetails,
} from "../../../redux/reducers/hsrporderReducer";
import Loader from "../../../UI/Loader";
import styles from "./OrderDetails.module.css";
import { toast } from "react-toastify";

const defaultProfileImage =
  "https://res.cloudinary.com/dqy2ts9h6/image/upload/v1722082558/SAI%20WebApp/profileImage.webp";

const OrderDetailsForAdmin = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const order = useSelector(getHSRPOrder);
  const loading = useSelector(getLoadingState);
  const error = useSelector(getError);
  const message = useSelector(getErrorMessage);
  const [isImageEnlarged, setIsImageEnlarged] = useState(false);

  useEffect(() => {
    if (orderId) {
      dispatch(fetchHSRPOrderDetails(orderId));
    }
  }, [dispatch, orderId]);

  useEffect(() => {
    if (error) {
      toast.error(message || "An error occurred while fetching order details.");
    }
  }, [error, message]);

  const handleImageClick = () => {
    setIsImageEnlarged(true);
  };

  const handleBackgroundClick = () => {
    setIsImageEnlarged(false);
  };

  if (loading) {
    return <Loader />;
  }

  if (!order) {
    return <p>No order details available.</p>;
  }

  return (
    <Container className="my-3">
      <Row className="justify-content-center">
        <Col xs={12} sm={11} md={10} lg={9}>
          <Card className="text-center">
            <Card.Header>Order Details</Card.Header>
            <Card.Body>
              <div className={styles.imageContainer}>
                <Image
                  src={order.userId?.profileImg || defaultProfileImage}
                  roundedCircle
                  className={styles.profileImage}
                  onClick={handleImageClick}
                  alt="Profile"
                />
                {isImageEnlarged && (
                  <div
                    className={styles.imageOverlay}
                    onClick={handleBackgroundClick}
                  >
                    <Image
                      src={order.userId?.profileImg || defaultProfileImage}
                      roundedCircle
                      className={styles.enlargedImage}
                      alt="Enlarged Profile"
                    />
                  </div>
                )}
              </div>
              <br />
              <Card.Title>Name: {order.userId?.name || "N/A"}</Card.Title>
              <Card.Text>
                Registration No: {order.registrationNo || "N/A"}
              </Card.Text>
              <Card.Text>
                Contact: {order.userId?.contactNumber || "N/A"}
              </Card.Text>
              <Card.Text>Chassis No: {order.chassisNo || "N/A"}</Card.Text>
              <Card.Text>
                Date of Registration: {order.dateOfRegistration || "N/A"}
              </Card.Text>
              <Card.Text>
                Date of Manufacture: {order.dateOfManufacture || "N/A"}
              </Card.Text>
              <Card.Text>
                Vehicle Class: {order.vehicleClass || "N/A"}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderDetailsForAdmin;
