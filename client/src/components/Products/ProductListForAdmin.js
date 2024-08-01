import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProducts,
  deleteProduct,
} from "../../redux/reducers/productReducer";
import { Container, Row, Col } from "react-bootstrap";
import ProductItemCardForAdmin from "../../pages/productPages/AllProductsForAdmin/ProductItemCardForAdmin";
import Loader from "../../UI/Loader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProductListForAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId))
      .then(() => {
        dispatch(fetchAllProducts());
        toast.success("Product deleted successfully");
      })
      .catch((err) => {
        // Handle errors more gracefully
        toast.error(err.message || "Failed to delete product");
      });
  };

  return (
    <Container className="d-flex justify-content-center">
      {loading ? (
        <Loader />
      ) : (
        <Row className="justify-content-center">
          {products && products.length > 0 ? (
            products.map((product) => (
              <Col key={product._id} md={12} className="mb-4">
                {product && (
                  <ProductItemCardForAdmin
                    product={product}
                    onDeleteProduct={() => handleDeleteProduct(product._id)}
                    onGetProductDetails={() =>
                      navigate(`/admin/product-details/${product._id}`)
                    }
                    onUpdateProduct={() =>
                      navigate(`/admin/update-product/${product._id}`)
                    }
                  />
                )}
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

export default ProductListForAdmin;
