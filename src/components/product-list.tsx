import { useEffect, useState } from "react";
import { Product } from "../models/interfaces/product-card-props";
import axios from "axios";
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProductCard from "./product-card";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [CatagoryList, setCatagoryList] = useState<Set<string | null>>(new Set());

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/products");
      setProducts(response.data.products);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(true);
    }
  };

  useEffect(() => {
    setCatagoryList(() => {
      const updatedCategoryList = new Set<string | null>();
      products.forEach((product) => {
        updatedCategoryList.add(product.category || "");
      });
      return updatedCategoryList;
    });
  }, [products]);

  const handleCategorySelected = (category: string | null) => {
    setSelectedCategory(category);
  };

  const filterProducts = selectedCategory
    ? products?.filter((product) => product.category === selectedCategory)
    : products;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!products) {
    return <div>Products not found!</div>;
  }

  const categoryElement = Array.from(CatagoryList).map((category) => (
    <Dropdown.Item
      key={category}
      onClick={() => handleCategorySelected(category)}
    >
      {category}
    </Dropdown.Item>
  ));

  return (
    <Container>
      <Row>
        <Col xs={12} className="mb-3 text-center">
          <Dropdown style={{ position: "relative", margin: "20px" }}>
            <Dropdown.Toggle variant="primary" id="categoryDropdown">
              {selectedCategory
                ? `Category: ${selectedCategory}`
                : "All Categorys"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleCategorySelected("")}>
                All Category's
              </Dropdown.Item>
              {categoryElement}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col xs={12}>
          <Row>
            {filterProducts?.map((product) => (
              <Col xs={12} md={4} lg={3} key={product.id} className="mb-3">
                <Link
                  to={`/product/${product.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <ProductCard
                    product={product}
                    onClick={() => {}}
                  ></ProductCard>
                </Link>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductList;
