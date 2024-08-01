import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./Footer.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWhatsapp,
  faYoutube,
  faInstagram,
  faFacebook,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const handleEmailClick = () => {
    window.location.href = "mailto:shivshaktiagroindustries12@gmail.com";
  };

  return (
    <footer className="footer mt-auto py-3">
      <Container className="bg-color">
        <Row>
          <Col md={6}>
            <h5>Contact Us</h5>
            <p>
              Email:{" "}
              <span
                onClick={handleEmailClick}
                style={{ cursor: "pointer", color: "blue" }}
              >
                shivshaktiagroindustries12@gmail.com
              </span>
            </p>
            <p>Phone: +91 9850037650 , +91 8767578894</p>
            <p>
              Address: Near MRF Showroom, Nanded Road Basmath, Hingoli - 431512,
              Maharashtra
            </p>
          </Col>
          <Col md={6}>
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li>
                <NavLink
                  to="https://api.whatsapp.com/send?phone=918767578894"
                  target="_blank"
                  className="nav-link"
                >
                  <FontAwesomeIcon icon={faWhatsapp} className="me-2" />
                  Whatsapp
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="https://instagram.com/shivshakti_agro_industry_1998?igshid=NzZlODBkYWE4Ng=="
                  target="_blank"
                  className="nav-link"
                >
                  <FontAwesomeIcon icon={faInstagram} className="me-2" />
                  Instagram
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="https://youtube.com/@ShivshaktiAgroIndustriesBasmat?si=n10KOxpnB82xxHOJ"
                  target="_blank"
                  className="nav-link"
                >
                  <FontAwesomeIcon icon={faYoutube} className="me-2" />
                  YouTube
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="https://www.facebook.com/profile.php?id=61550625940101&mibextid=b06tZ0"
                  target="_blank"
                  className="nav-link"
                >
                  <FontAwesomeIcon icon={faFacebook} className="me-2" />
                  Facebook
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="https://www.linkedin.com/in/revansidha-kanchangire-b746452bb/"
                  target="_blank"
                  className="nav-link"
                >
                  <FontAwesomeIcon icon={faLinkedin} className="me-2" />
                  Linkedin
                </NavLink>
              </li>
            </ul>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col md={12}>
            <p className="text-center">
              &copy; {new Date().getFullYear()} Agriculture Company. All rights
              reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
