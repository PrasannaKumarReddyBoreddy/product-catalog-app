import { useParams } from "react-router-dom";
import { Product, ProductState } from "../models/interfaces/product-card-props";
import { Button, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  const loading = useSelector((state: ProductState)=> state.loading);
  const error = useSelector((state: ProductState)=> state.error);
  const products: Product[] = useSelector((state: ProductState)=>state.products);

  useEffect(() => {
    const foundProduct = products.find((product) => product.id === Number(id));
    setProduct(foundProduct || null);
  }, [id, products]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product || error) {
    return <div>Having trouble finding the product!! Please try again later</div>;
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