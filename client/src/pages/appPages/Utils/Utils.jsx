import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Card } from "react-bootstrap";

const Utils = () => {
  return (
    <Card
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
        backgroundColor: "#f8f9fa",
        border: "1px solid #dee2e6",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Card.Body
        style={{
          width: "50%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Button
          as={NavLink}
          to="/utils/capacity"
          variant="primary"
          activeClassName="active"
        >
          Calculator
        </Button>
        <Button
          as={NavLink}
          to="/utils/price-calculator"
          variant="primary"
          activeClassName="active"
        >
          Price Calculator
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Utils;
