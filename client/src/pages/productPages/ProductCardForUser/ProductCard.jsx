import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const defaultProductImage = "https://res.cloudinary.com/dqy2ts9h6/image/upload/v1722082653/SAI%20WebApp/productImage.jpg";
const ProductCard = ({ product }) => {
  const { _id, title, minPrice, maxPrice, productImg } = product;
  const [imgError, setImgError] = useState(false);

  return (
    <Card style={{ width: "18rem", margin: "10px" }}>
      <Card.Img
        variant="top"
        src={imgError ? defaultProductImage : productImg}
        onError={() => setImgError(true)}
      />
      <hr />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          Price: ₹{minPrice} {" - "} ₹{maxPrice}
        </Card.Text>
        <Link to={`/products/detail/${_id}`} className="btn btn-primary">
          View Details
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
