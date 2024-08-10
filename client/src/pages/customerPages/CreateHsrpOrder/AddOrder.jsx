import React, { useState } from "react";
import { Form, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getLoadingState } from "../../../redux/reducers/hsrporderReducer";
import { getUser } from "../../../redux/reducers/authReducer";
import Loader from "../../../UI/Loader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./AddOrder.module.css";
import PaymentButton from "../../../components/Payment/PaymentButton";

const HsrpOrderForm = () => {
  const [formData, setFormData] = useState({
    registrationNo: "",
    chassisNo: "",
    dateOfRegistration: "",
    dateOfManufacture: "",
    vehicleClass: "Non-Transport",
  });

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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please sign in as a customer to book an HSRP order.");
      return;
    }
    // Directly initiate payment
    initiatePayment();
  };

  const initiatePayment = () => {
    const paymentButtonElement = document.getElementById("payment-button");
    if (paymentButtonElement) {
      paymentButtonElement.click();
    }
  };

  return (
    <Container className={styles.container + " mt-4"}>
      <h2 className={styles.formHeader}>Order Form</h2>
      {loading ? (
        <Loader />
      ) : (
        <Form onSubmit={handleFormSubmit}>
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
              className={styles.formControl}
            >
              <option value="Non-Transport">Non-Transport</option>
              <option value="Transport">Transport</option>
            </Form.Control>
          </Form.Group>

          <PaymentButton
            amount={1200}
            description="HSRP Order Payment"
            payfor="HSRP"
            formData={formData}
            id="payment-button"
          />
        </Form>
      )}
    </Container>
  );
};

export default HsrpOrderForm;
