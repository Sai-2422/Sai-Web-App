import styles from "./SignInForm.module.css";
import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  signIn,
  getUser,
  getLoadingState,
} from "../../../../redux/reducers/authReducer";
import Loader from "../../../../UI/Loader";

const SignInForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loading = useSelector(getLoadingState);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signIn({ email, password }))
      .unwrap()
      .then(() => {
        toast.success("Signed in successfully!");
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.message || "Failed to sign in. Please try again.");
      });
  };

  const handleReset = () => {
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

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
          <h2 className="text-center">Sign In</h2>
          <br />
          <br />
          {loading && <Loader />}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                Email address <span className={styles.required}>*</span>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>
                Password <span className={styles.required}>*</span>
              </Form.Label>
              <div className="input-group">
                <Form.Control
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  variant={isPasswordVisible ? "warning" : "info"}
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  className={styles.passwordToggle}
                >
                  {isPasswordVisible ? "Hide" : "Show"}
                </Button>
              </div>
            </Form.Group>
            <br />
            <div className="d-flex justify-content-between align-items-center">
              <Button variant="primary" type="submit" disabled={loading}>
                Sign In
              </Button>
              <Button variant="secondary" type="button" onClick={handleReset}>
                Reset
              </Button>
            </div>
            <br />
            <div className="mt-3 text-center">
              <Link to="/user/reset-password">Forgot Password?</Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignInForm;
