import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getError,
  getErrorMessage,
  getLoadingState,
  getAllHSRPOrders,
  fetchAllHSRPOrders,
  deleteHsrpOrderRequest,
} from "../../redux/reducers/hsrporderReducer";
import { manualRefund } from "../../redux/reducers/paymentReducer";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Loader from "../../UI/Loader";
import { toast } from "react-toastify";
import OrderItemCardForAdmin from "../../pages/customerPages/HsrpOrderCard/OrderItemCardForAdmin";

const OrdersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orders = useSelector(getAllHSRPOrders);
  const loading = useSelector(getLoadingState);
  const error = useSelector(getError);
  const errorMessage = useSelector(getErrorMessage);

  useEffect(() => {
    dispatch(fetchAllHSRPOrders());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(errorMessage);
    }
  }, [error, errorMessage]);

  const handleDeleteOrder = (orderId) => {
    dispatch(deleteHsrpOrderRequest(orderId))
      .then(() => {
        dispatch(fetchAllHSRPOrders());
        toast.success("Order deleted successfully");
      })
      .catch((err) => {
        toast.error(err.message || "Failed to delete Order");
      });
  };

  const handleManualRefund = async (
    orderId,
    paymentId,
    amount,
    productType
  ) => {
    try {
      await dispatch(
        manualRefund({ orderId, paymentId, amount, productType })
      ).unwrap();
      toast.success("Refund processed successfully");
      dispatch(fetchAllHSRPOrders()); // Refresh orders list
    } catch (err) {
      toast.error(err.message || "Failed to process refund");
    }
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
                  onManualRefund={() =>
                    handleManualRefund(
                      order.orderId,
                      order.paymentId,
                      order.amount,
                      "HSRP"
                    )
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
                marginBottom: "20px",
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
