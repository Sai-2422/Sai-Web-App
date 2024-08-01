import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllInternships,
  getLoadingState,
  getError,
  getErrorMessage,
  getAllInternships,
} from "../../redux/reducers/internshipReducer";
import { Container, Row, Col } from "react-bootstrap";
import InternshipInfo from "../../pages/studentPages/AllInternships/InternshipInfo";
import Loader from "../../UI/Loader";
import { toast } from "react-toastify";

const styles = {
  heading: {
    marginBottom: "20px",
    fontSize: "2rem",
    color: "#333",
  },
  description: {
    marginBottom: "30px",
    fontSize: "1.2rem",
    color: "#555",
  },
};

const InternshipList = () => {
  const dispatch = useDispatch();
  const internships = useSelector(getAllInternships);
  const loading = useSelector(getLoadingState);
  const error = useSelector(getError);
  const errorMessage = useSelector(getErrorMessage);

  useEffect(() => {
    dispatch(fetchAllInternships());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(errorMessage);
    }
  }, [error, errorMessage]);

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Row>
            <Col md={12} className="mb-4">
              <h2 style={styles.heading}>Internship Opportunities</h2>
              <p style={styles.description}>
                Explore various internship fields within our manufacturing
                industry focused on agriculture equipment, such as tanker
                trolleys. Each field offers unique learning opportunities and
                hands-on experience.
              </p>
            </Col>
          </Row>
          <Row>
            {internships && internships.length > 0 ? (
              internships.map((internship) => (
                <Col key={internship._id} md={4} className="mb-4">
                  <InternshipInfo internship={internship} />
                </Col>
              ))
            ) : (
              <Col md={12}>
                <p>No internships found.</p>
              </Col>
            )}
          </Row>
        </>
      )}
    </Container>
  );
};

export default InternshipList;
