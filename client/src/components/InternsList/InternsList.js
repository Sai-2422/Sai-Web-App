import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAllInterns,
  deleteInternship,
  sendOfferLetter,
  sendCertificate,
  getLoadingState,
  getError,
  getErrorMessage,
  getAllInternsData,
} from "../../redux/reducers/internsReducer";
import { Container, Row, Col } from "react-bootstrap";
import InternItemCardForAdmin from "../../pages/studentPages/AllInterns/InternItemCardForAdmin";
import Loader from "../../UI/Loader";
import { toast } from "react-toastify";

const InternsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const interns = useSelector(getAllInternsData);
  const loading = useSelector(getLoadingState);
  const error = useSelector(getError);
  const errorMessage = useSelector(getErrorMessage);

  useEffect(() => {
    dispatch(getAllInterns());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(errorMessage);
    }
  }, [error, errorMessage]);

  const handleDeleteIntern = (internId) => {
    dispatch(deleteInternship(internId))
      .then(() => {
        dispatch(getAllInterns());
        toast.success("Intern deleted successfully");
      })
      .catch((err) => {
        toast.error(err.message || "Failed to delete intern");
      });
  };

  const handleSendOfferLetter = (internId) => {
    dispatch(sendOfferLetter(internId))
      .then(() => {
        toast.success("Offer letter sent successfully");
      })
      .catch((err) => {
        toast.error(err.message || "Failed to send offer letter");
      });
  };

  const handleSendCertificate = (internId) => {
    dispatch(sendCertificate(internId))
      .then(() => {
        toast.success("Certificate sent successfully");
      })
      .catch((err) => {
        toast.error(err.message || "Failed to send Certificate");
      });
  };

  if (!interns) {
    return <div >Interns Not Found</div>;
  }

  return (
    <Container className="d-flex justify-content-center">
      {loading ? (
        <Loader />
      ) : (
        <Row>
          {interns && interns.length > 0 ? (
            interns.map((intern) => (
              <Col key={intern._id} md={12}>
                <InternItemCardForAdmin
                  intern={intern}
                  onDeleteIntern={() => handleDeleteIntern(intern._id)}
                  onGetDetails={() =>
                    navigate(`/admin/intern-details/${intern._id}`)
                  }
                  onSendOfferLetter={() => handleSendOfferLetter(intern._id)}
                  onSendCertificate={() => handleSendCertificate(intern._id)}
                />
              </Col>
            ))
          ) : (
            <p>No interns found.</p>
          )}
        </Row>
      )}
    </Container>
  );
};

export default InternsList;
