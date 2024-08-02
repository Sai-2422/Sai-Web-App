import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

const INCHES_TO_METERS = 0.0254;
const CUBIC_METERS_TO_LITERS = 1000;
// 1 Brass = 100 cubic feet = 2.83168 cubic meters
const CUBIC_METERS_TO_BRASS = 2.83168;

const containerStyle = {
  background: "#f8f9fa",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

const headingStyle = {
  color: "#343a40",
};

const buttonStyle = {
  width: "100%",
};

const Calculator = () => {
  const [product, setProduct] = useState("tanker");
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const [volumeLiters, setVolumeLiters] = useState(null);
  const [capacityBrass, setCapacityBrass] = useState(null);
  const [error, setError] = useState("");

  const calculateVolumeAndCapacity = (e) => {
    e.preventDefault();
    setError("");
    setVolumeLiters(null);
    setCapacityBrass(null);

    const heightInMeters = parseFloat(height) * INCHES_TO_METERS;
    const widthInMeters = parseFloat(width) * INCHES_TO_METERS;
    const lengthInMeters = parseFloat(length) * INCHES_TO_METERS;

    if (heightInMeters <= 0 || widthInMeters <= 0 || lengthInMeters <= 0) {
      setError("Please enter positive values for height, width, and length.");
      return;
    }

    if (product === "tanker") {
      // Volume of a cylindrical tanker = π * radius^2 * height
      const radiusInMeters = widthInMeters / 2;
      const volumeInCubicMeters =
        Math.PI * Math.pow(radiusInMeters, 2) * heightInMeters;
      setVolumeLiters(volumeInCubicMeters * CUBIC_METERS_TO_LITERS);
    } else if (product === "trolley") {
      // Volume of a cubic trolley = height * width * length
      const volumeInCubicMeters =
        heightInMeters * widthInMeters * lengthInMeters;
      setCapacityBrass(volumeInCubicMeters * (1 / CUBIC_METERS_TO_BRASS));
    }
  };

  return (
    <Container className="my-3" style={containerStyle}>
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6}>
          <h2 className="text-center mb-4" style={headingStyle}>
            Product Volume &amp; Capacity Calculator
          </h2>
          <Form onSubmit={calculateVolumeAndCapacity}>
            <Form.Group className="mb-3" controlId="formProduct">
              <Form.Label>Product</Form.Label>
              <Form.Control
                as="select"
                value={product}
                onChange={(e) => {
                  setProduct(e.target.value);
                  setVolumeLiters(null);
                  setCapacityBrass(null);
                }}
                required
              >
                <option value="tanker">Tanker</option>
                <option value="trolley">Trolley</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formHeight">
              <Form.Label>Height (inches)</Form.Label>
              <Form.Control
                type="number"
                step="0.1"
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
                step="0.1"
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
                step="0.1"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                placeholder="Enter length"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" style={buttonStyle}>
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
              <p>Volume of Tanker: {volumeLiters.toFixed(2)} liters</p>
            </div>
          )}
          {capacityBrass !== null && (
            <div className="mt-4">
              <h4>Results:</h4>
              <p>Capacity of Trolley: {capacityBrass.toFixed(2)} brass</p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Calculator;
