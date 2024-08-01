import "./ResetPasswordToken.css";
import React, { useState } from "react";
import { Form, Button, Container, Row, Col, InputGroup } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetPasswordUsingToken,
  getLoadingState,
} from "../../../../../redux/reducers/authReducer";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../../../UI/Loader";

const ResetPasswordToken = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const loading = useSelector(getLoadingState);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    try {
      await dispatch(
        resetPasswordUsingToken({ token, password, confirmPassword })
      ).unwrap();
      toast.success("Password reset successful!");
      navigate("/user/sign-in");
    } catch (err) {
      toast.error(err.message || "Error resetting password.");
    }
  };

  return (
    <>
      <Container className="mt-5 forget-password-container">
        <Row className="justify-content-center">
          {loading && <Loader />}
          <Col xs={12} sm={11} md={10} lg={9}>
            <h2 className="forget-password-heading">Reset Password</h2>
            <Form onSubmit={handlePasswordReset}>
              <Form.Group
                className="mb-3 forget-password-input"
                controlId="formBasicPassword"
              >
                <Form.Label>
                  New Password <span className="required">*</span>
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group
                className="mb-3 forget-password-input"
                controlId="formBasicConfirmPassword"
              >
                <Form.Label>
                  Confirm Password <span className="required">*</span>
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    type={isConfirmPasswordVisible ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() =>
                      setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                    }
                  >
                    {isConfirmPasswordVisible ? "Hide" : "Show"}
                  </Button>
                </InputGroup>
              </Form.Group>
              <Button
                className="forget-password-button"
                variant="primary"
                type="submit"
                disabled={loading}
              >
                Reset Password
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ResetPasswordToken;
