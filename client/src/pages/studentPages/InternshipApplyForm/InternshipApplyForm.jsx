import React, { useState, useEffect } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { getUser } from "../../../redux/reducers/authReducer";
import {
  getLoadingState,
  applyInternship,
} from "../../../redux/reducers/internsReducer";
import {
  fetchAllInternships,
  getAllInternships,
} from "../../../redux/reducers/internshipReducer";
import Loader from "../../../UI/Loader";
import "react-toastify/dist/ReactToastify.css";
import styles from "./InternshipApplyForm.module.css";
import emailjs from "@emailjs/browser";

const InternshipForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const internships = useSelector(getAllInternships);
  const loading = useSelector(getLoadingState);

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [field, setField] = useState("");
  const [duration, setDuration] = useState("");
  const [fields, setFields] = useState([]);
  const [internType, setInternType] = useState("");

  useEffect(() => {
    dispatch(fetchAllInternships());
  }, [dispatch]);

  useEffect(() => {
    if (internships.length > 0) {
      setFields(internships.map((internship) => internship.title));
    }
  }, [internships]);

  useEffect(() => {
    if (fromDate && duration) {
      const toDate = new Date(fromDate);
      toDate.setMonth(toDate.getMonth() + parseInt(duration, 10)); // Convert duration to a number
      setToDate(toDate);
    }
  }, [fromDate, duration]);

  const formatDate = (date) => {
    if (!date) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentDate = new Date();
    if (!fromDate || !toDate || !field || !duration || !internType) {
      toast.error("All fields are required.");
      return;
    }

    if (fromDate < currentDate) {
      toast.error("The start date cannot be earlier than today.");
      return;
    }

    const formData = new FormData();
    formData.append("userId", user._id);
    formData.append("from", formatDate(fromDate));
    formData.append("to", formatDate(toDate));
    formData.append("field", field);
    formData.append("duration", parseInt(duration, 10));
    formData.append("internType", internType);

    const templateParams = {
      userId: user._id,
      from: formatDate(fromDate),
      to: formatDate(toDate),
      field: field,
      duration: parseInt(duration, 10),
      internType: internType,
    };

    emailjs
      .send(
        "service_rd0g32e",
        "template_agbymft",
        templateParams,
        "rAyUEBHPJefoBlhQO"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
        },
        (error) => {
          console.log("FAILED...", error);
        }
      );

    dispatch(applyInternship(formData))
      .then(() => toast.success(`${internType} applied successfully`))
      .catch((error) => toast.error(error.message));
  };

  return (
    <Form onSubmit={handleSubmit} className={`${styles.formContainer} my-3`}>
      {loading && <Loader />}
      <Form.Group as={Row} controlId="formFromDate">
        <Form.Label column sm={2} className={styles.formLabel}>
          From
        </Form.Label>
        <Col sm={10}>
          <DatePicker
            selected={fromDate}
            onChange={(date) => setFromDate(date)}
            dateFormat="dd-MM-yyyy"
            className={styles.formControl}
            required
          />
        </Col>
      </Form.Group>
      <br />
      <Form.Group as={Row} controlId="formDuration">
        <Form.Label column sm={2} className={styles.formLabel}>
          Duration
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            as="select"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className={styles.formControl}
            required
          >
            <option value="">Select duration</option>
            <option value="1">1 month</option>
            <option value="2">2 months</option>
            <option value="3">3 months</option>
          </Form.Control>
        </Col>
      </Form.Group>
      <br />
      <Form.Group as={Row} controlId="formField">
        <Form.Label column sm={2} className={styles.formLabel}>
          Field
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            as="select"
            value={field}
            onChange={(e) => setField(e.target.value)}
            className={styles.formControl}
            required
          >
            <option value="">Select a field</option>
            {fields.map((fieldOption) => (
              <option key={fieldOption} value={fieldOption}>
                {fieldOption}
              </option>
            ))}
          </Form.Control>
        </Col>
      </Form.Group>
      <br />
      <Form.Group as={Row} controlId="formInternType">
        <Form.Label column sm={2} className={styles.formLabel}>
          Intern Type
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            as="select"
            value={internType}
            onChange={(e) => setInternType(e.target.value)}
            className={styles.formControl}
            required
          >
            <option value="">Select intern type</option>
            <option value="internship">Internship</option>
            <option value="apprenticeship">Apprenticeship</option>
          </Form.Control>
        </Col>
      </Form.Group>
      <br />
      <Button type="submit" className={styles.submitButton} disabled={loading}>
        Submit
      </Button>
    </Form>
  );
};

export default InternshipForm;
