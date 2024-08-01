import styles from "./UpdateProfile.module.css";
import React, { useState, useEffect } from "react";
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
  getLoadingState,
  updateProfile,
  getUser,
} from "../../../../redux/reducers/authReducer";
import Loader from "../../../../UI/Loader";

const defaultProfileImage =
  "https://res.cloudinary.com/dqy2ts9h6/image/upload/v1722082558/SAI%20WebApp/profileImage.webp";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(getUser);
  const loading = useSelector(getLoadingState);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    address: "",
  });

  const [previewImg, setPreviewImg] = useState(defaultProfileImage);
  const [removeImage, setRemoveImage] = useState(false);
  const [profileImg, setProfileImg] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Profile image size should be less than 2MB");
        return;
      }
      setProfileImg(file);
      setPreviewImg(URL.createObjectURL(file));
      setRemoveImage(false);
    }
  };

  const handleRemoveImage = () => {
    setRemoveImage(true);
    setPreviewImg(defaultProfileImage);
    setProfileImg(null);
    document.getElementById("formProfileImg").value = "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("contactNumber", formData.contactNumber);
    data.append("address", formData.address);
    if (profileImg) {
      data.append("profileImg", profileImg);
    }
    if (removeImage) {
      data.append("removeImage", true);
    }

    dispatch(updateProfile(data))
      .unwrap()
      .then(() => {
        toast.success("User details updated successfully!");
        handleReset();
        navigate("/");
      })
      .catch((err) => {
        toast.error(
          err.message || "Failed to update user details. Please try again."
        );
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
    setProfileImg(null);
  };

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        contactNumber: user.contactNumber || "",
        address: user.address || "",
      });
      setPreviewImg(user.profileImg || defaultProfileImage);
    }
  }, [user]);

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
          {loading && <Loader />}
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
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
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
            <Form.Group className="mb-3" controlId="formProfileImg">
              <Form.Label>
                Profile Image (max 2MB)<span className={styles.maybe}>*</span>
              </Form.Label>
              <Form.Control
                type="file"
                name="profileImg"
                onChange={handleImageChange}
              />
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
          <p className="mt-3 text-center">
            If you want to change your role, please contact the admin.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateProfile;
