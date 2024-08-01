import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import styles from "./UserItemCardForAdmin.module.css";
import Loader from "../../../../UI/Loader";
import { getLoadingState } from "../../../../redux/reducers/authReducer";

const defaultProfileImage =
  "https://res.cloudinary.com/dqy2ts9h6/image/upload/v1722082558/SAI%20WebApp/profileImage.webp";
const UserItemCardForAdmin = ({
  user,
  onDeleteUser,
  onUpdateUser,
  onGetDetails,
}) => {
  const loading = useSelector(getLoadingState);

  if (!user) {
    return <div className={styles.notFound}>Users Not Found</div>;
  }

  return (
    <Card className={styles.userCard}>
      <Card.Body>
        <Row>
          <Col xs={12} sm={4} className="text-center mb-3 mb-sm-0">
            <img
              src={user?.profileImg || defaultProfileImage}
              alt={`${user.name}`}
              className={styles.userImage}
            />
          </Col>
          <Col xs={12} sm={8}>
            <Card.Title>{user.name}</Card.Title>
            <Card.Text>Role: {user.role}</Card.Text>
            <div className={styles.buttonGroup}>
              {loading ? (
                <Loader />
              ) : (
                <>
                  <Button variant="primary" onClick={onGetDetails}>
                    Get Details
                  </Button>
                  <Button variant="danger" onClick={onDeleteUser}>
                    Delete
                  </Button>
                  <Button variant="warning" onClick={onUpdateUser}>
                    Update
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

export default UserItemCardForAdmin;
