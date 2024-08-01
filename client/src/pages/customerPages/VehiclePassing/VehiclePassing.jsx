import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import styles from "./VehiclePassing.module.css";

const VehiclePassing = () => {
  return (
    <Container className={styles.container}>
      <Row>
        <Col xs={12}>
          <h1 className={styles.header}>Documents Required:</h1>
          <ul className={styles.ul}>
            <li className={styles.li}>Aadhar Card</li>
            <li className={styles.li}>Driver's License</li>
            <li className={styles.li}>Vehicle Registration Certificate (RC)</li>
            <li className={styles.li}>
              Pollution Under Control (PUC) Certificate
            </li>
            <li className={styles.li}>Insurance Certificate</li>
          </ul>
          <div className={styles.buttonContainer}>
            <p>For passing, click the button below:</p>
            <NavLink
              to="https://api.whatsapp.com/send?phone=918767578894"
              target="_blank"
              className={styles.whatsappButton}
            >
              <FontAwesomeIcon icon={faWhatsapp} className={styles.icon} />
              WhatsApp
            </NavLink>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default VehiclePassing;
