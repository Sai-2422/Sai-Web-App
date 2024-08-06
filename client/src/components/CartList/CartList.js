import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCartItems,
  deleteCartItem,
  updateCartItemQuantity,
  getAllCartItems,
  getLoadingState,
  getErrorMessage,
  getError,
} from "../../redux/reducers/cartItemReducer";
import { Container, Row, Col } from "react-bootstrap";
import CartItemCard from "../../pages/cartPages/CartItemCard/CartItemCard";
import Loader from "../../UI/Loader";
import { toast } from "react-toastify";

const CartList = () => {
  const dispatch = useDispatch();

  // Access Redux state
  const error = useSelector(getError);
  const loading = useSelector(getLoadingState);
  const cartItems = useSelector(getAllCartItems);
  const errorMessage = useSelector(getErrorMessage);

  useEffect(() => {
    dispatch(fetchAllCartItems());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(errorMessage || "An error occurred.");
    }
  }, [error, errorMessage]);

  const handleDeleteCartItem = (itemId) => {
    dispatch(deleteCartItem(itemId))
      .then(() => {
        dispatch(fetchAllCartItems());
        toast.success("Item deleted successfully");
      })
      .catch((err) => {
        toast.error(err.message || "Failed to delete item");
      });
  };

  const handleIncreaseQuantity = (itemId, quantity) => {
    if (!itemId || quantity === undefined) {
      toast.error("Invalid item ID or quantity.");
      return;
    }
    dispatch(updateCartItemQuantity({ itemId, quantity }))
      .then(() => dispatch(fetchAllCartItems()))
      .catch((err) => toast.error(err.message || "Failed to update quantity"));
  };

  const handleDecreaseQuantity = (itemId, quantity) => {
    if (!itemId || quantity === undefined) {
      toast.error("Invalid item ID or quantity.");
      return;
    }
    dispatch(updateCartItemQuantity({ itemId, quantity }))
      .then(() => dispatch(fetchAllCartItems()))
      .catch((err) => toast.error(err.message || "Failed to update quantity"));
  };

  return (
    <Container className="d-flex justify-content-center">
      {loading ? (
        <Loader />
      ) : (
        <Row>
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((item) => (
              <Col key={item._id} md={12}>
                <CartItemCard
                  item={item}
                  onDeleteItem={() => handleDeleteCartItem(item._id)}
                  onIncreaseQuantity={handleIncreaseQuantity}
                  onDecreaseQuantity={handleDecreaseQuantity}
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
              No items found in the cart.
            </div>
          )}
        </Row>
      )}
    </Container>
  );
};

export default CartList;
