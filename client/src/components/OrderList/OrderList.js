import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrders,
  getAllOrders,
  getLoadingState,
  getErrorMessage,
  getError,
  deleteHsrpRequest,
} from "../../redux/reducers/orderReducer";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Loader from "../../UI/Loader";
import { toast } from "react-toastify";
import OrderItemCardForAdmin from "../../pages/customerPages/HsrpOrderCard/OrderItemCardForAdmin";

const OrdersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orders = useSelector(getAllOrders);
  const loading = useSelector(getLoadingState);
  const error = useSelector(getError);
  const errorMessage = useSelector(getErrorMessage);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(errorMessage);
    }
  }, [error, errorMessage]);

  const handleDeleteOrder = (orderId) => {
    dispatch(deleteHsrpRequest(orderId))
      .then(() => {
        dispatch(fetchAllOrders());
        toast.success("Order deleted successfully");
      })
      .catch((err) => {
        toast.error(err.message || "Failed to delete Order");
      });
  };

  return (
    <Container className="d-flex justify-content-center">
      {loading ? (
        <Loader />
      ) : (
        <Row>
          {orders && orders.length > 0 ? (
            orders.map((order) => (
              <Col key={order._id} md={12}>
                <OrderItemCardForAdmin
                  order={order}
                  onDeleteOrder={() => handleDeleteOrder(order._id)}
                  onGetDetails={() =>
                    navigate(`/admin/order-details/${order._id}`)
                  }
                />
              </Col>
            ))
          ) : (
            <div
              style={{
                color: "red",
                fontSize: "20px",
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              Order Not Found
            </div>
          )}
        </Row>
      )}
    </Container>
  );
};

export default OrdersList;
