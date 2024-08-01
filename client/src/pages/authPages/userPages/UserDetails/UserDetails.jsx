import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import {
  getUser,
  getLoadingState,
} from "../../../../redux/reducers/authReducer";
import Loader from "../../../../UI/Loader";
import styles from "./UserDetails.module.css";

const defaultProfileImage =
  "https://res.cloudinary.com/dqy2ts9h6/image/upload/v1722082558/SAI%20WebApp/profileImage.webp";
const UserDetails = () => {
  const user = useSelector(getUser);
  const loading = useSelector(getLoadingState);
  const [isImageEnlarged, setIsImageEnlarged] = useState(false);

  const handleImageClick = () => {
    setIsImageEnlarged(true);
  };

  const handleBackgroundClick = () => {
    setIsImageEnlarged(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Container className="my-3">
      <Row className="justify-content-center">
        <Col xs={12} sm={11} md={10} lg={9}>
          <Card className="text-center">
            <Card.Header>User Details</Card.Header>
            <Card.Body>
              <div className={styles.imageContainer}>
                <Image
                  src={user?.profileImg || defaultProfileImage}
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
                      src={user?.profileImg || defaultProfileImage}
                      roundedCircle
                      className={styles.enlargedImage}
                      alt="Enlarged Profile"
                    />
                  </div>
                )}
              </div>
              <br />
              <Card.Title>Name: {user?.name}</Card.Title>
              <Card.Text>Role: {user?.role}</Card.Text>
              <Card.Text>Gender: {user?.gender}</Card.Text>
              <Card.Text>Email: {user?.email}</Card.Text>
              <Card.Text>Contact Number: {user?.contactNumber}</Card.Text>
              <Card.Text>Address: {user?.address}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserDetails;
