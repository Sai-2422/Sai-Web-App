import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchUserDetails,
  updateUserProfile,
  getLoadingState,
} from "../../../../redux/reducers/authReducer";
import {
  Form,
  Button,
  Container,
  Image,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";
import Loader from "../../../../UI/Loader";
import { toast } from "react-toastify";
import styles from "./UpdateUserByAdmin.module.css";

const defaultProfileImage =
  "https://res.cloudinary.com/dqy2ts9h6/image/upload/v1722082558/SAI%20WebApp/profileImage.webp";
const roles = ["admin", "customer", "student"];

const UpdateUserByAdmin = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.selectedUser);
  const loading = useSelector(getLoadingState);

  const [formData, setFormData] = useState({});
  const [removeImage, setRemoveImage] = useState(false);
  const [previewImg, setPreviewImg] = useState(defaultProfileImage);
  const [role, setRole] = useState("");

  useEffect(() => {
    dispatch(fetchUserDetails(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        contactNumber: user.contactNumber,
        address: user.address,
      });
      setPreviewImg(user.profileImg || defaultProfileImage);
      setRole(user.role || "");
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleRemoveImage = () => {
    setRemoveImage(true);
    setPreviewImg(defaultProfileImage);
    document.getElementById("formProfileImg").value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("contactNumber", formData.contactNumber);
    data.append("address", formData.address);
    data.append("role", role);

    // Append removeImage flag if image is to be removed
    if (removeImage) {
      data.append("removeImage", true);
    }

    dispatch(updateUserProfile({ userId, formData: data }))
      .unwrap()
      .then(() => {
        toast.success("User updated successfully");
        handleReset();
        navigate("/admin/users");
      })
      .catch((err) => {
        toast.error(err.message || "Failed to update user");
      });
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      contactNumber: "",
      address: "",
    });
    setPreviewImg(defaultProfileImage);
    setRemoveImage(false);
    setRole("");
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Container className="my-3" style={{ minHeight: "100vh" }}>
      <Row className="w-100 justify-content-center">
        <Col
          xs={12}
          sm={11}
          md={10}
          lg={9}
          className={`${styles.gradientBackground} p-4 rounded`}
        >
          <h2 className="text-center">Update User Details</h2>
          <div className="text-center mb-3">
            <Image
              src={previewImg}
              roundedCircle
              alt="Profile Preview"
              className={styles.imagePreview}
            />
            <Form.Group className="mt-3" controlId="formRemoveImage">
              <Button variant="danger" onClick={handleRemoveImage}>
                Remove Profile Image
              </Button>
            </Form.Group>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>
                Name <span className={styles.required}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter name"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                Email address <span className={styles.required}>*</span>
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicContactNumber">
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
                  placeholder="Enter contact number"
                  required
                />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Label>
                Address <span className={styles.required}>*</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter address"
                required
                style={{ height: "100px" }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formRole">
              <Form.Label>
                Role <span className={styles.required}>*</span>
              </Form.Label>
              {roles.map((roleOption) => (
                <Form.Check
                  key={roleOption}
                  type="radio"
                  label={
                    roleOption.charAt(0).toUpperCase() + roleOption.slice(1)
                  }
                  name="role"
                  value={roleOption}
                  checked={role === roleOption}
                  onChange={handleRoleChange}
                  inline
                />
              ))}
            </Form.Group>
            <div className={styles.buttonContainer}>
              <Button variant="success" type="submit" disabled={loading}>
                Update Details
              </Button>
              <Button variant="secondary" type="button" onClick={handleReset}>
                Reset
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateUserByAdmin;
