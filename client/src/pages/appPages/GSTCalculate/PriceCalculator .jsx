import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const styles = {
  container: {
    backgroundColor: "#f8f9fa", // Light grey background
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    marginTop: "2rem",
  },
  header: {
    marginBottom: "1rem",
  },
  formGroup: {
    marginBottom: "1.5rem",
  },
  button: {
    marginTop: "1rem",
  },
};

const PriceCalculator = () => {
  const [calcType, setCalcType] = useState("mainToTotal");
  const [totalPrice, setTotalPrice] = useState("");
  const [gstPercentage, setGstPercentage] = useState("");
  const [mainPrice, setMainPrice] = useState("");
  const [cgst, setCgst] = useState("");
  const [sgst, setSgst] = useState("");

  const [mainPriceForTotalCalc, setMainPriceForTotalCalc] = useState("");
  const [gstPercentageForTotalCalc, setGstPercentageForTotalCalc] =
    useState("");
  const [totalPriceForTotalCalc, setTotalPriceForTotalCalc] = useState("");
  const [cgstForTotalCalc, setCgstForTotalCalc] = useState("");
  const [sgstForTotalCalc, setSgstForTotalCalc] = useState("");

  const calculateMainPrice = () => {
    if (totalPrice && gstPercentage) {
      const mainPriceValue = (totalPrice / (1 + gstPercentage / 100)).toFixed(
        2
      );
      setMainPrice(mainPriceValue);
      const gstValue = ((totalPrice - mainPriceValue) / 2).toFixed(2);
      setCgst(gstValue);
      setSgst(gstValue);
    }
  };

  const calculateTotalPrice = () => {
    if (mainPriceForTotalCalc && gstPercentageForTotalCalc) {
      const gstValue = (
        (mainPriceForTotalCalc * gstPercentageForTotalCalc) /
        100
      ).toFixed(2);
      const totalPriceValue = (
        parseFloat(mainPriceForTotalCalc) + parseFloat(gstValue)
      ).toFixed(2);
      setTotalPriceForTotalCalc(totalPriceValue);
      setCgstForTotalCalc((gstValue / 2).toFixed(2));
      setSgstForTotalCalc((gstValue / 2).toFixed(2));
    }
  };

  return (
    <Container style={styles.container}>
      <Row className="mb-4">
        <Col>
          <h3 style={styles.header}>Price Calculator</h3>
          <Form>
            <Form.Group controlId="calcType">
              <Form.Label>Calculation Type</Form.Label>
              <Form.Control
                as="select"
                value={calcType}
                onChange={(e) => setCalcType(e.target.value)}
              >
                <option value="mainToTotal">
                  Main(Without GST) to Total(With GST)
                </option>
                <option value="totalToMain">
                  Total(With GST) to Main(Without GST)
                </option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      {calcType === "totalToMain" ? (
        <Row className="mb-4">
          <Col>
            <h3 style={styles.header}>
              Calculate Main Price from Total Price with GST
            </h3>
            <Form>
              <Form.Group controlId="totalPrice" style={styles.formGroup}>
                <Form.Label>Total Price (with GST)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter total price"
                  value={totalPrice}
                  onChange={(e) => setTotalPrice(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="gstPercentage" style={styles.formGroup}>
                <Form.Label>GST Percentage</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter GST percentage"
                  value={gstPercentage}
                  onChange={(e) => setGstPercentage(e.target.value)}
                />
              </Form.Group>
              <Button
                variant="primary"
                onClick={calculateMainPrice}
                style={styles.button}
              >
                Calculate Main Price
              </Button>
            </Form>
            <h5>Main Price: {mainPrice}</h5>
            <h5>CGST: {cgst}</h5>
            <h5>SGST: {sgst}</h5>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>
            <h3 style={styles.header}>
              Calculate Total Price with GST from Main Price
            </h3>
            <Form>
              <Form.Group
                controlId="mainPriceForTotalCalc"
                style={styles.formGroup}
              >
                <Form.Label>Main Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter main price"
                  value={mainPriceForTotalCalc}
                  onChange={(e) => setMainPriceForTotalCalc(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                controlId="gstPercentageForTotalCalc"
                style={styles.formGroup}
              >
                <Form.Label>GST Percentage</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter GST percentage"
                  value={gstPercentageForTotalCalc}
                  onChange={(e) => setGstPercentageForTotalCalc(e.target.value)}
                />
              </Form.Group>
              <Button
                variant="primary"
                onClick={calculateTotalPrice}
                style={styles.button}
              >
                Calculate Total Price
              </Button>
            </Form>
            <h5>Total Price (with GST): {totalPriceForTotalCalc}</h5>
            <h5>CGST: {cgstForTotalCalc}</h5>
            <h5>SGST: {sgstForTotalCalc}</h5>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default PriceCalculator;
