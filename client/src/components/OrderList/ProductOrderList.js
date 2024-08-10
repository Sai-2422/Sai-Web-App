import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getError,
  getErrorMessage,
  getLoadingState,
  cancelOrderStatus,
  getAllProductOrders,
  fetchAllProductOrders,
  deleteProductOrderRequest,
} from "../../redux/reducers/productorderReducer";
import { Container, Row, Col } from "react-bootstrap";
import Loader from "../../UI/Loader";
import { toast } from "react-toastify";
import ProductOrderCard from "../../pages/productOrderPages/ProductOrderCard/ProductOrderCard";

const ProductOrdersList = () => {
  const dispatch = useDispatch();
  const orders = useSelector(getAllProductOrders);
  const loading = useSelector(getLoadingState);
  const error = useSelector(getError);
  const errorMessage = useSelector(getErrorMessage);

  useEffect(() => {
    dispatch(fetchAllProductOrders());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(errorMessage);
    }
  }, [error, errorMessage]);

  const handleDeleteOrder = (orderId) => {
    dispatch(deleteProductOrderRequest(orderId))
      .then(() => {
        dispatch(fetchAllProductOrders());
        toast.success("Order deleted successfully");
      })
      .catch((err) => {
        toast.error(err.message || "Failed to delete order");
      });
  };

  const handleCancelOrder = (orderId) => {
    dispatch(cancelOrderStatus(orderId))
      .then(() => {
        dispatch(fetchAllProductOrders());
        toast.success("Order canceled successfully");
      })
      .catch((err) => {
        toast.error(err.message || "Failed to cancel order");
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
                <ProductOrderCard
                  order={order}
                  onDeleteOrder={() => handleDeleteOrder(order._id)}
                  onCancelOrder={() => handleCancelOrder(order._id)} // Pass cancel handler to the card
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

export default ProductOrdersList;
