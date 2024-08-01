import React, { useEffect, useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getLoadingState,
  updateInternship,
  fetchAllInternships,
  getAllInternships,
} from "../../../redux/reducers/internshipReducer";
import Loader from "../../../UI/Loader";
import "react-toastify/dist/ReactToastify.css";
import styles from "./UpdateInternship.module.css";

const UpdateInternship = () => {
  const { internId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(getLoadingState);
  const internships = useSelector(getAllInternships);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!internships.length) {
      dispatch(fetchAllInternships());
    } else {
      const internship = internships.find(
        (intern) => intern._id === internId
      );
      if (internship) {
        setTitle(internship.title);
        setDescription(internship.description);
      }
    }
  }, [dispatch, internId, internships]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) {
      toast.error("All fields are required.");
      return;
    }

    const updatedData = {
      title,
      description,
    };

    dispatch(updateInternship({ internshipId: internId, updatedData }))
      .then(() => {
        toast.success("Internship updated successfully");
        navigate("/admin/internships");
      })
      .catch((error) => toast.error(error.message));
  };

  const resetForm = () => {
    const internship = internships.find((intern) => intern._id === internId);
    if (internship) {
      setTitle(internship.title);
      setDescription(internship.description);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className={`${styles.formContainer} my-3`}>
      {loading && <Loader />}
      <Form.Group as={Row} controlId="formTitle">
        <Form.Label column sm={2} className={styles.formLabel}>
          Title
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.formControl}
            required
          />
        </Col>
      </Form.Group>
      <br />
      <Form.Group as={Row} controlId="formDescription">
        <Form.Label column sm={2} className={styles.formLabel}>
          Description
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            as="textarea"
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.formControl}
            required
          />
        </Col>
      </Form.Group>
      <br />
      <Row>
        <Col sm={{ span: 10, offset: 2 }}>
          <Button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            Update
          </Button>
          <Button
            type="button"
            className={`${styles.resetButton} ml-3`}
            onClick={resetForm}
            disabled={loading}
          >
            Reset
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default UpdateInternship;
