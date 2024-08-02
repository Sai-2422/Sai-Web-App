import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import styles from "./InternItemCardForAdmin.module.css";
import Loader from "../../../UI/Loader";
import { getLoadingState } from "../../../redux/reducers/internsReducer";

const defaultProfileImage =
  "https://res.cloudinary.com/dqy2ts9h6/image/upload/v1722082558/SAI%20WebApp/profileImage.webp";
const InternItemCardForAdmin = ({
  intern,
  onDeleteIntern,
  onGetDetails,
  onSendOfferLetter,
  onSendCertificate,
}) => {
  const loading = useSelector(getLoadingState);

  return (
    <Card className={styles.internCard}>
      <Card.Body>
        <Row>
          <Col xs={12} sm={4} className="text-center mb-3 mb-sm-0">
            <img
              src={intern.userId.profileImg || defaultProfileImage}
              alt={`${intern.name}`}
              className={styles.internImage}
            />
          </Col>
          <Col xs={12} sm={8}>
            <Card.Title>{intern.name}</Card.Title>
            <Card.Text>Name: {intern.userId.name}</Card.Text>
            <div className={styles.buttonGroup}>
              {loading ? (
                <Loader />
              ) : (
                <>
                  <Button variant="primary" onClick={onGetDetails}>
                    Get Details
                  </Button>
                  <Button variant="danger" onClick={onDeleteIntern}>
                    Delete
                  </Button>
                  <Button variant="info" onClick={onSendOfferLetter}>
                    Send Offer Letter
                  </Button>
                  <Button variant="success" onClick={onSendCertificate}>
                    Send Certificate
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

export default InternItemCardForAdmin;
