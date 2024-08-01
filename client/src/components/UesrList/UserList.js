import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllUsers, deleteUser } from "../../redux/reducers/authReducer";
import { Container, Row, Col } from "react-bootstrap";
import UserItemCardForAdmin from "../../pages/authPages/adminPages/AllUsersForAdmin/UserItemCardForAdmin";
import Loader from "../../UI/Loader";
import { toast } from "react-toastify";

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.auth.allUsers);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const errorMessage = useSelector((state) => state.auth.message);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(errorMessage);
    }
  }, [error, errorMessage]);

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId))
      .then(() => {
        dispatch(fetchAllUsers());
        toast.success("User deleted successfully");
      })
      .catch((err) => {
        toast.error(err.message || "Failed to delete user");
      });
  };

  return (
    <Container className="d-flex justify-content-center">
      {loading ? (
        <Loader />
      ) : (
        <Row>
          {users && users.length > 0 ? (
            users.map((user) => (
              <Col key={user._id} md={12}>
                <UserItemCardForAdmin
                  user={user}
                  onDeleteUser={() => handleDeleteUser(user._id)}
                  onGetDetails={() =>
                    navigate(`/admin/user-details/${user._id}`)
                  }
                  onUpdateUser={() =>
                    navigate(`/admin/update-user/${user._id}`)
                  }
                />
              </Col>
            ))
          ) : (
            <p>No users found.</p>
          )}
        </Row>
      )}
    </Container>
  );
};

export default UserList;
