import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Container, Row, Col, Image } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  fetchInternDetails,
  getInternDetails,
  getLoadingState,
  getError,
  getErrorMessage,
} from "../../../redux/reducers/internsReducer";
import Loader from "../../../UI/Loader";
import styles from "./InternDetail.module.css";

const defaultProfileImage =
  "https://res.cloudinary.com/dqy2ts9h6/image/upload/v1722082558/SAI%20WebApp/profileImage.webp";

const InternDetail = () => {
  const { internId } = useParams();
  const dispatch = useDispatch();
  const intern = useSelector(getInternDetails);
  const loading = useSelector(getLoadingState);
  const error = useSelector(getError);
  const errorMessage = useSelector(getErrorMessage);

  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    dispatch(fetchInternDetails(internId));
  }, [dispatch, internId]);

  useEffect(() => {
    if (error) {
      toast.error(errorMessage || "Failed to fetch intern details");
    }
  }, [error, errorMessage]);

  const handleImageClick = () => {
    setShowOverlay(true);
  };

  const handleOverlayClick = () => {
    setShowOverlay(false);
  };

  if (loading) {
    return <Loader />;
  }

  if (!intern) {
    return <div>No intern found.</div>;
  }

  return (
    <Container className={styles.container}>
      <Row>
        <Col
          xs={12}
          md={11}
          sm={10}
          xl={9}
          className="d-flex justify-content-center"
        >
          <Card className={styles.internCard}>
            <Card.Body className="text-center">
              <div className={styles.imageContainer}>
                <Image
                  src={intern.userId?.profileImg || defaultProfileImage}
                  roundedCircle
                  className={styles.profileImage}
                  onClick={handleImageClick}
                  alt="Profile"
                />
              </div>
              <Card.Title>
                {intern.userId?.name || "No Name Available"}
              </Card.Title>
              <Card.Text>
                <strong>ID:</strong> {intern.ID || "N/A"}
              </Card.Text>
              <Card.Text>
                <strong>Email:</strong> {intern.userId?.email || "N/A"}
              </Card.Text>
              <Card.Text>
                <strong>Contact Number:</strong>{" "}
                {intern.userId?.contactNumber || "N/A"}
              </Card.Text>
              <Card.Text>
                <strong>Field:</strong> {intern.field || "N/A"}
              </Card.Text>
              <Card.Text>
                <strong>Intern Type:</strong> {intern.internType || "N/A"}
              </Card.Text>
              <Card.Text>
                <strong>Duration:</strong> {intern.duration || "N/A"} {"months"}
              </Card.Text>
              <Card.Text>
                <strong>From:</strong> {intern.from || "N/A"}
              </Card.Text>
              <Card.Text>
                <strong>To:</strong> {intern.to || "N/A"}
              </Card.Text>
              <Card.Text>
                <strong>Gender:</strong> {intern.userId?.gender || "N/A"}
              </Card.Text>
              <Card.Text>
                <strong>Address:</strong> {intern.userId?.address || "N/A"}
              </Card.Text>
            </Card.Body>
          </Card>
          {showOverlay && (
            <div className={styles.imageOverlay} onClick={handleOverlayClick}>
              <Image
                src={intern.userId?.profileImg || defaultProfileImage}
                className={styles.enlargedImage}
                alt="Enlarged Profile"
              />
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default InternDetail;
