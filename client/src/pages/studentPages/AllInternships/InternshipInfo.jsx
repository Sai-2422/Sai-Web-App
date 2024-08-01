import React from "react";
import { Card } from "react-bootstrap";

const styles = {
  cardHeader: {
    backgroundColor: "#007bff",
    color: "white",
    fontWeight: "bold",
  },
};

const InternshipInfo = ({ internship }) => {
  return (
    <Card>
      <Card.Header as="h5" style={styles.cardHeader}>
        {internship.title}
      </Card.Header>
      <Card.Body>
        <Card.Text>{internship.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default InternshipInfo;
