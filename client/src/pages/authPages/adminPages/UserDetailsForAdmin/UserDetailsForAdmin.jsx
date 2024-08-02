import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchUserDetails,
  getLoadingState,
} from "../../../../redux/reducers/authReducer";
import { Card, Container, Row, Col, Image } from "react-bootstrap";
import Loader from "../../../../UI/Loader";

const defaultProfileImage =
  "https://res.cloudinary.com/dqy2ts9h6/image/upload/v1722082558/SAI%20WebApp/profileImage.webp";

const UserDetailsForAdmin = () => {
  const { userId } = useParams();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.selectedUser);
  const loading = useSelector(getLoadingState);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserDetails(userId));
    }
  }, [dispatch, userId]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Container className="my-3">
      {user ? (
        <Card>
          <Card.Body>
            <Row>
              <Col xs={12} sm={4} className="text-center mb-3 mb-sm-0">
                <Image
                  src={user.profileImg || defaultProfileImage}
                  alt={`${user.name}`}
                  roundedCircle
                  fluid
                  style={{ width: "100px", height: "100px" }}
                />
              </Col>
              <Col xs={12} sm={8} className="my-3">
                <Card.Title>{user?.name}</Card.Title>
                <Card.Text>Role: {user?.role}</Card.Text>
                <Card.Text>Gender: {user?.gender}</Card.Text>
                <Card.Text>Email: {user?.email}</Card.Text>
                <Card.Text>Contact Number: {user?.contactNumber}</Card.Text>
                <Card.Text>Address: {user?.address}</Card.Text>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ) : (
        <div
          style={{
            color: "red",
            fontSize: "20px",
            textAlign: "center",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          User not found
        </div>
      )}
    </Container>
  );
};

export default UserDetailsForAdmin;
