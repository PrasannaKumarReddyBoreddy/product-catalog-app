import { ProductCardProps } from "../models/interfaces/product-card-props";
import { Card } from "react-bootstrap";

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {

  return (
    <Card onClick={onClick} style={{height: "100%"}}>
      <Card.Img variant="top" src={product.thumbnail} alt={product.title}/>
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;