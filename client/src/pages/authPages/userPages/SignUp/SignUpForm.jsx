import styles from "./SignUpForm.module.css";
import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Image,
  InputGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  signUp,
  getLoadingState,
} from "../../../../redux/reducers/authReducer";
import Loader from "../../../../UI/Loader";

const defaultProfileImage =
  "https://res.cloudinary.com/dqy2ts9h6/image/upload/v1722082558/SAI%20WebApp/profileImage.webp";
const SignUpForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profileImg: null,
    role: "customer",
    contactNumber: "",
    address: "",
    gender: "male",
  });

  const loading = useSelector(getLoadingState);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [previewImg, setPreviewImg] = useState(null);

  const handleChange = (e) => {
    if (e.target.name === "profileImg") {
      const file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Profile image should be a maximum of 2MB.");
      } else {
        setFormData({ ...formData, profileImg: file });
        setPreviewImg(URL.createObjectURL(file));
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleRoleChange = (e) => {
    setFormData({ ...formData, role: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("role", formData.role);
    data.append("contactNumber", formData.contactNumber);
    data.append("address", formData.address);
    data.append("gender", formData.gender);
    if (formData.profileImg) {
      data.append("profileImg", formData.profileImg);
    }

    dispatch(signUp(data))
      .unwrap()
      .then(() => {
        toast.success("Sign up successful! Redirecting to Sign In...");
        navigate("/user/sign-in");
      })
      .catch((err) => {
        toast.error(err.message || "Sign up failed!");
      });
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      profileImg: null,
      role: "customer",
      contactNumber: "",
      address: "",
      gender: "male",
    });
    setPreviewImg(null);
  };
  return (
    <Container className="my-3">
      <Row className="justify-content-md-center">
        <Col
          xs={12}
          sm={11}
          md={10}
          lg={9}
          className={styles.gradientBackground}
        >
          <h2 className="text-center">Sign Up</h2>
          {loading && <Loader />}
          <div className="text-center mb-3">
            <Image
              src={previewImg || defaultProfileImage}
              roundedCircle
              alt="Profile Preview"
              style={{ width: 100, height: 100 }}
            />
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>
                Name <span className={styles.required}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter full name"
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>
                Email <span className={styles.required}>*</span>
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>
                Password <span className={styles.required}>*</span>
              </Form.Label>
              <div className="input-group">
                <Form.Control
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter password"
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

            <Form.Group controlId="formContactNumber">
              <Form.Label>
                Contact Number <span className={styles.required}>*</span>
              </Form.Label>
              <InputGroup>
                <InputGroup.Text>+91</InputGroup.Text>
                <Form.Control
                  type="text"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  required
                  placeholder="Enter contact number"
                />
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="formAddress">
              <Form.Label>
                Address <span className={styles.required}>*</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="Enter address"
                style={{ height: "100px" }}
              />
              <Form.Text className="text-muted">
                Please enter your full address (Street, City, State, ZIP).
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formProfileImg">
              <Form.Label>
                Profile Image (maximum of 2MB)
                <span className={styles.maybe}>*</span>
              </Form.Label>
              <Form.Control
                type="file"
                name="profileImg"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formRole">
              <Form.Label>Role</Form.Label>
              <div className="d-flex">
                <Form.Check
                  type="radio"
                  label="Customer"
                  name="role"
                  value="customer"
                  checked={formData.role === "customer"}
                  onChange={handleRoleChange}
                  className="me-3"
                />
                <Form.Check
                  type="radio"
                  label="Student"
                  name="role"
                  value="student"
                  checked={formData.role === "student"}
                  onChange={handleRoleChange}
                  className="me-3"
                />
              </div>
            </Form.Group>
            <Form.Group controlId="formGender">
              <Form.Label>Gender</Form.Label>
              <div className="d-flex">
                <Form.Check
                  type="radio"
                  label="Male"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                  className="me-3"
                />
                <Form.Check
                  type="radio"
                  label="Female"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                  className="me-3"
                />
                <Form.Check
                  type="radio"
                  label="Other"
                  name="gender"
                  value="other"
                  checked={formData.gender === "other"}
                  onChange={handleChange}
                />
              </div>
            </Form.Group>
            <br />
            <div className="d-flex justify-content-between align-items-center">
              <Button variant="primary" type="submit" disabled={loading}>
                Sign Up
              </Button>
              <Button variant="secondary" type="button" onClick={handleReset}>
                Reset
              </Button>
            </div>
          </Form>
          <p className="mt-3 text-center">
            We respect your privacy. Your information will not be shared.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpForm;
