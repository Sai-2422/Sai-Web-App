import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../redux/reducers/productReducer";
import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "../../pages/productPages/ProductCardForUser/ProductCard";
import Loader from "../../UI/Loader";
import { toast } from "react-toastify";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const loading = useSelector((state) => state.product.loading);
  const error = useSelector((state) => state.product.error);
  const errorMessage = useSelector((state) => state.product.message);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(errorMessage);
    }
  }, [error, errorMessage]);

  return (
    <Container className="d-flex justify-content-center">
      {loading ? (
        <Loader />
      ) : (
        <Row className="justify-content-center">
          {products.length > 0 ? (
            products.map((product) => (
              <Col key={product._id} xs={12} sm={6} md={4} className="mb-4">
                <ProductCard product={product} />
              </Col>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </Row>
      )}
    </Container>
  );
};

export default ProductList;
