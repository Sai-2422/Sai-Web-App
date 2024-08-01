import styles from "./About.module.css";
import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

const ownerImage =
  "https://res.cloudinary.com/dqy2ts9h6/image/upload/v1722082483/SAI%20WebApp/ownerImage.jpg";
const companyName = "Shivshakti Agro Industries";
const establishmentYear = 1998;

const About = () => {
  return (
    <Container className={`py-5 my-3 ${styles.welcomeContainer}`}>
      <Row className="justify-content-center align-items-center">
        <Col md={6} className="text-center">
          <Image src={ownerImage} roundedCircle className={styles.ownerImage} />
          <h2 className={styles.companyName}>Welcome to {companyName}!</h2>
          <p>
            I am proud to introduce {companyName}, a company born from a passion
            for agriculture and a dream to make a difference. Starting from
            scratch, I embarked on this journey with determination and a vision
            to innovate in the agricultural sector. What began as a small
            endeavor has grown into a robust enterprise, driven by a commitment
            to excellence and sustainability.
          </p>
          <p>
            At {companyName}, we blend traditional wisdom with modern technology
            to enhance agricultural productivity and foster sustainable
            practices. Our journey is a testament to perseverance and the belief
            that with hard work and dedication, anything is possible.
          </p>
          <p>
            Join us as we continue to grow, innovate, and contribute to the
            prosperity of agriculture.
          </p>
          <p className="text-muted">
            Warm regards,
            <br />
            [Revansidha Kanchangire]
            <br />
            Founder, {companyName}
            <br />
            Established In, {establishmentYear}
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
