import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductDetails from './components/product-details';
import ProductList from './components/product-list';
import "bootstrap/dist/css/bootstrap.min.css";


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
};

export default App;