import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./ApprenticeshipForm.module.css"; // Assuming you have a CSS module for custom styles

const ApprenticeshipForm = () => {
  return (
    <Container className={styles.container}>
      <Row className="mb-4">
        <Col>
          <h1 className={styles.heading}>Apprenticeship Opportunities</h1>
          <p className={styles.description}>
            Explore various apprenticeship opportunities available through the
            official Apprenticeship India portal. You can search for
            opportunities by establishment and field to find the best fit for
            your career goals.
          </p>
          <Card className={styles.infoCard}>
            <Card.Body>
              <Card.Title>How to Find Apprenticeships</Card.Title>
              <Card.Text>
                To find apprenticeship opportunities with Shivshakti Agro
                Industries, visit the following link. In the search field
                labeled "Search By Establishment Name," enter "Shivshakti Agro
                Industries" to discover available programs at our company.
              </Card.Text>
              <a
                href="https://www.apprenticeshipindia.gov.in/apprenticeship/opportunity"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Explore Apprenticeships
              </a>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ApprenticeshipForm;
