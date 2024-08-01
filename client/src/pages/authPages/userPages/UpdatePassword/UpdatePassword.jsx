import styles from "./UpdatePassword.module.css";
import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  updatePassword,
  getLoadingState,
} from "../../../../redux/reducers/authReducer";
import Loader from "../../../../UI/Loader";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const loading = useSelector(getLoadingState);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("currentPassword", formData.currentPassword);
    data.append("newPassword", formData.newPassword);
    data.append("confirmPassword", formData.confirmPassword);

    dispatch(updatePassword(data))
      .unwrap()
      .then(() => {
        toast.success("Password updated successfully!");
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.message || "Failed to update password. Please try again.");
      });
  };

  return (
    <Container className="my-3">
      <Row className="justify-content-center">
        <Col
          xs={12}
          sm={11}
          md={10}
          lg={9}
          className={styles.gradientBackground}
        >
          <h2 className="text-center">Update Password</h2>
          {loading && <Loader />}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formcurrentPassword">
              <Form.Label>
                Current Password <span className={styles.required}>*</span>
              </Form.Label>
              <Form.Control
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="Enter current password"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formNewPassword">
              <Form.Label>
                New Password <span className={styles.required}>*</span>
              </Form.Label>
              <Form.Control
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Label>
                Confirm New Password <span className={styles.required}>*</span>
              </Form.Label>
              <div className="input-group">
                <Form.Control
                  type={isConfirmPasswordVisible ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm new password"
                  required
                />
                <Button
                  variant={isConfirmPasswordVisible ? "warning" : "info"}
                  onClick={() =>
                    setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                  }
                  className={styles.passwordToggle}
                >
                  {isConfirmPasswordVisible ? "Hide" : "Show"}
                </Button>
              </div>
            </Form.Group>
            <Button variant="primary" type="submit" disabled={loading}>
              Update Password
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdatePassword;
