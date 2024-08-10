import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getError,
  getErrorMessage,
  getLoadingState,
  getAllProductOrders,
  fetchAllOrdersForAdmin,
  updateProductOrderStatus,
  deleteProductOrderRequest,
} from "../../redux/reducers/productorderReducer";
import { manualRefund } from "../../redux/reducers/paymentReducer";
import { Container, Row, Col } from "react-bootstrap";
import Loader from "../../UI/Loader";
import { toast } from "react-toastify";
import ProductOrderCardForAdmin from "../../pages/productOrderPages/ProductOrderCardForAdmin/ProductOrderCardForAdmin";

const ProductOrdersListForAdmin = () => {
  const dispatch = useDispatch();
  const orders = useSelector(getAllProductOrders);
  const loading = useSelector(getLoadingState);
  const error = useSelector(getError);
  const errorMessage = useSelector(getErrorMessage);

  useEffect(() => {
    dispatch(fetchAllOrdersForAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(errorMessage);
    }
  }, [error, errorMessage]);

  const handleDeleteOrder = (orderId) => {
    dispatch(deleteProductOrderRequest(orderId))
      .then(() => {
        dispatch(fetchAllOrdersForAdmin());
        toast.success("Order deleted successfully");
      })
      .catch((err) => {
        toast.error(err.message || "Failed to delete order");
      });
  };

  const handleUpdateOrderStatus = (orderId, status) => {
    dispatch(updateProductOrderStatus({ orderId, status }))
      .then(() => {
        dispatch(fetchAllOrdersForAdmin());
        toast.success("Order status updated successfully");
      })
      .catch((err) => {
        toast.error(err.message || "Failed to update order status");
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
      dispatch(fetchAllOrdersForAdmin()); // Refresh orders list
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
                <ProductOrderCardForAdmin
                  order={order}
                  onDeleteOrder={() => handleDeleteOrder(order._id)}
                  onUpdateOrderStatus={(status) =>
                    handleUpdateOrderStatus(order._id, status)
                  }
                  onManualRefund={() =>
                    handleManualRefund(
                      order.orderId,
                      order.paymentId,
                      order.amount,
                      "PRODUCT"
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

export default ProductOrdersListForAdmin;
