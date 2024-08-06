import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import {
  postHsrpOrderRequest,
  getLoadingState,
} from "../../../redux/reducers/hsrporderReducer";
import { getUser } from "../../../redux/reducers/authReducer";
import { toast } from "react-toastify";
import Loader from "../../../UI/Loader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./AddOrder.module.css";

const HsrpOrderForm = () => {
  const [formData, setFormData] = useState({
    registrationNo: "",
    chassisNo: "",
    dateOfRegistration: "",
    dateOfManufacture: "",
    vehicleClass: "Non-Transport",
  });

  const dispatch = useDispatch();
  const loading = useSelector(getLoadingState);
  const user = useSelector(getUser);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      dateOfManufacture: date ? date.toISOString().split("T")[0] : "",
      userId: user ? user._id : formData.userId,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(postHsrpOrderRequest(formData)).unwrap();
      toast.success("Order data posted successfully.");
    } catch (error) {
      toast.error(error.message || "Failed to post order data.");
    }
  };

  return (
    <Container className={styles.container + " mt-4"}>
      <h2 className={styles.formHeader}>Order Form</h2>
      {loading ? (
        <Loader />
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group
            controlId="formRegistrationNo"
            className={styles.formGroup}
          >
            <Form.Label className={styles.formLabel}>
              Registration Number
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter registration number"
              name="registrationNo"
              value={formData.registrationNo}
              onChange={handleChange}
              required
              className={styles.formControl}
            />
          </Form.Group>

          <Form.Group controlId="formChassisNo" className={styles.formGroup}>
            <Form.Label className={styles.formLabel}>Chassis Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter chassis number"
              name="chassisNo"
              value={formData.chassisNo}
              onChange={handleChange}
              required
              className={styles.formControl}
            />
          </Form.Group>

          <Form.Group
            controlId="formDateOfRegistration"
            className={styles.formGroup}
          >
            <Form.Label className={styles.formLabel}>
              Date of Registration
            </Form.Label>
            <Form.Control
              type="date"
              name="dateOfRegistration"
              value={formData.dateOfRegistration}
              onChange={handleChange}
              required
              className={styles.formControl}
            />
          </Form.Group>

          <Form.Group
            controlId="formDateOfManufacture"
            className={styles.formGroup}
          >
            <Form.Label className={`${styles.formLabel}`}>
              Date of Manufacture
            </Form.Label>
            <DatePicker
              selected={
                formData.dateOfManufacture
                  ? new Date(formData.dateOfManufacture)
                  : null
              }
              onChange={handleDateChange}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              showFullMonthYearPicker
              placeholderText="Select month and year"
              className={styles.datepicker + " form-control"}
            />
          </Form.Group>

          <Form.Group controlId="formVehicleClass" className={styles.formGroup}>
            <Form.Label className={styles.formLabel}>Vehicle Class</Form.Label>
            <Form.Control
              as="select"
              name="vehicleClass"
              value={formData.vehicleClass}
              onChange={handleChange}
              required
              className={styles.formControl}
            >
              <option value="Transport">Transport</option>
              <option value="Non-Transport">Non-Transport</option>
            </Form.Control>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className={styles.submitButton}
          >
            Submit
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default HsrpOrderForm;
