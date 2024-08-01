import React from "react";
import { Card, Button } from "react-bootstrap";

const styles = {
  cardHeader: {
    backgroundColor: "#007bff",
    color: "white",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};

const InternshipInfoForAdmin = ({ internship, onUpdate, onDelete }) => {
  return (
    <Card>
      <Card.Header as="h5" style={styles.cardHeader}>
        {internship.title}
        <div>
          <Button
            variant="warning"
            onClick={() => onUpdate(internship._id)}
            className="me-2"
          >
            Update
          </Button>
          <Button variant="danger" onClick={() => onDelete(internship._id)}>
            Delete
          </Button>
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Text>{internship.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default InternshipInfoForAdmin;
