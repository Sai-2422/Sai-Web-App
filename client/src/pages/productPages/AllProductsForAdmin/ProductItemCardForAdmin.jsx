import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import styles from "./ProductItemCardForAdmin.module.css";
import Loader from "../../../UI/Loader";

const defaultProductImage =
  "https://res.cloudinary.com/dqy2ts9h6/image/upload/v1722082653/SAI%20WebApp/productImage.jpg";

const ProductItemCardForAdmin = ({
  product,
  onDeleteProduct,
  onUpdateProduct,
  onGetProductDetails,
}) => {
  const loading = useSelector((state) => state.product.loading);

  if (!product) {
    return <div className={styles.notFound}>Product Not Found</div>;
  }

  return (
    <Card className={styles.productCard}>
      <Card.Body>
        <Row>
          <Col xs={12} sm={4} className="text-center mb-3 mb-sm-0">
            <img
              src={product?.productImg || defaultProductImage}
              alt={`${product.title}`}
              className={styles.productImage}
            />
          </Col>
          <Col xs={12} sm={8}>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>
              Price: ₹{product.minPrice}
              {" - "}₹{product.maxPrice}
            </Card.Text>
            <div className={styles.buttonGroup}>
              {loading ? (
                <Loader />
              ) : (
                <>
                  <Button variant="primary" onClick={onGetProductDetails}>
                    Get Details
                  </Button>
                  <Button variant="danger" onClick={onDeleteProduct}>
                    Delete
                  </Button>
                  <Button variant="warning" onClick={onUpdateProduct}>
                    Update
                  </Button>
                </>
              )}
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ProductItemCardForAdmin;
