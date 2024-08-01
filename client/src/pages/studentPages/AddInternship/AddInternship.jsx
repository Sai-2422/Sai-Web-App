import React, { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getLoadingState,
  postNewInternship,
} from "../../../redux/reducers/internshipReducer";
import Loader from "../../../UI/Loader";
import "react-toastify/dist/ReactToastify.css";
import styles from "./AddInternship.module.css";

const AddInternship = () => {
  const dispatch = useDispatch();
  const loading = useSelector(getLoadingState);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) {
      toast.error("All fields are required.");
      return;
    }

    const internshipData = {
      title,
      description,
    };

    dispatch(postNewInternship(internshipData))
      .then(() => toast.success("Internship added successfully"))
      .catch((error) => toast.error(error.message));
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
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
            Submit
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

export default AddInternship;
