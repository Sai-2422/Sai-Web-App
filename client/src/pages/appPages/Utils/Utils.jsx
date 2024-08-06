import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Card } from "react-bootstrap";

const Utils = () => {
  const isMobile = window.innerWidth < 576;

  const cardStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "50vh",
    backgroundColor: "#f8f9fa",
    border: "1px solid #dee2e6",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const cardBodyStyle = {
    width: "90%",
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    justifyContent: "center",
    alignItems: "center",
    gap: isMobile ? "10px" : "20px",
  };

  const buttonStyle = {
    width: "100%",
    maxWidth: "300px",
  };

  return (
    <Card style={cardStyle}>
      <Card.Body style={cardBodyStyle}>
        <Button
          as={NavLink}
          to="/utils/capacity"
          variant="primary"
          style={buttonStyle}
        >
          Capacity
        </Button>
        <Button
          as={NavLink}
          to="/utils/price-calculator"
          variant="primary"
          style={buttonStyle}
        >
          GST Calculator
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Utils;
