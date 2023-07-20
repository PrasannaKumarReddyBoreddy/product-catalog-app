import { useParams } from "react-router-dom";
import { Product } from "../models/interfaces/product-card-props";
import { Button, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProduct();
  }, [id]);

  const getProduct = async () => {
    await axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(true);
        console.error("Error fetching product details:", error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <Container>
      <h2>Product Details ID: {id}</h2>
      <h3>{product?.title}</h3>
      <p>{product?.description}</p>
      <p>Price: ${product?.price}</p>
      <p>Rating: {product?.rating}</p>
      <p>Stock: {product?.stock}</p>
      <p>Brand: {product?.brand}</p>
      <p>Category: {product?.category}</p>
      <Button variant="primary" href="/">Back to Products</Button>
    </Container>
  );
};

export default ProductDetails;
