import styles from "./Contact.module.css";
import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import emailjs from "@emailjs/browser";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "student",
    contact: "",
    address: "",
    message: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    emailjs
      .send("service_rd0g32e", "template_mwnvycr", formData, "rAyUEBHPJefoBlhQO")
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
        },
        (error) => {
          console.log("FAILED...", error);
        }
      );
    setFormData({
      name: "",
      email: "",
      role: "student",
      contact: "",
      address: "",
      message: "",
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      role: "student",
      contact: "",
      address: "",
      message: "",
    });
  };

  return (
    <Row className="justify-content-center mt-3">
      <Col md={8}>
        <Container className={styles.contactSection}>
          <h2>Contact Us</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name :</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email :</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="contact">
              <Form.Label>Contact No. :</Form.Label>
              <Form.Control
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="address">
              <Form.Label>Address :</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="message">
              <Form.Label>Message :</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="contactType">
              <Form.Label>Contact Type :</Form.Label>
              <div>
                <Form.Check
                  type="radio"
                  label="Student"
                  name="role"
                  value="student"
                  checked={formData.role === "student"}
                  onChange={handleChange}
                />
                <Form.Check
                  type="radio"
                  label="Customer"
                  name="role"
                  value="customer"
                  checked={formData.role === "customer"}
                  onChange={handleChange}
                />
              </div>
            </Form.Group>
            <br />
            <div className="d-flex justify-content-between align-items-center">
              <Button variant="primary" type="submit">
                Submit
              </Button>
              <Button variant="secondary" type="button" onClick={handleReset}>
                Reset
              </Button>
            </div>
          </Form>
        </Container>
      </Col>
    </Row>
  );
};

export default Contact;
