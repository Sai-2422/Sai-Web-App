import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import styles from "./Calculator.module.css";

const INCHES_TO_METERS = 0.0254;
const CUBIC_METERS_TO_LITERS = 1000;
const CUBIC_METERS_TO_BRASS = 0.1; // 1 Brass = 0.1 cubic meter

const Calculator = () => {
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const [volumeLiters, setVolumeLiters] = useState(null);
  const [capacityBrass, setCapacityBrass] = useState(null);
  const [error, setError] = useState("");

  const calculateVolumeAndCapacity = (e) => {
    e.preventDefault();
    setError("");

    const heightInMeters = height * INCHES_TO_METERS;
    const widthInMeters = width * INCHES_TO_METERS;
    const lengthInMeters = length * INCHES_TO_METERS;

    if (heightInMeters <= 0 || widthInMeters <= 0 || lengthInMeters <= 0) {
      setError("Please enter positive values for height, width, and length.");
      return;
    }

    const volumeInCubicMeters = heightInMeters * widthInMeters * lengthInMeters;
    setVolumeLiters(volumeInCubicMeters * CUBIC_METERS_TO_LITERS);
    setCapacityBrass(volumeInCubicMeters / CUBIC_METERS_TO_BRASS);
  };

  return (
    <Container className={`my-3 ${styles.container}`}>
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6}>
          <h2 className="text-center mb-4">
            Tanker and Trolley Capacity Calculator
          </h2>
          <Form onSubmit={calculateVolumeAndCapacity}>
            <Form.Group className="mb-3" controlId="formHeight">
              <Form.Label>Height (inches)</Form.Label>
              <Form.Control
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Enter height"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formWidth">
              <Form.Label>Width (inches)</Form.Label>
              <Form.Control
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                placeholder="Enter width"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLength">
              <Form.Label>Length (inches)</Form.Label>
              <Form.Control
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                placeholder="Enter length"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Calculate
            </Button>
          </Form>
          {error && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          )}
          {volumeLiters !== null && (
            <div className="mt-4">
              <h4>Results:</h4>
              <p>Volume Of Product: {volumeLiters.toFixed(2)} liters</p>
              <p>Capacity Of Product: {capacityBrass.toFixed(2)} brass</p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Calculator;
