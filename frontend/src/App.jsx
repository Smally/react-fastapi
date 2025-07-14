import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography } from "@mui/material";
import ProductForm from "./components/ProductForm";
import ProductTable from "./components/ProductTable";

const API_URL = "http://localhost:8000/products"; // docker users may need host.docker.internal

export default function App() {
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(API_URL);
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async (product) => {
    try {
      await axios.post(API_URL, product);
      fetchData(); // refresh after adding
    } catch (err) {
      console.error("Failed to add product:", err);
    }
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>Stock Check</Typography>
      <ProductForm onAdd={handleAdd} />
      <ProductTable products={products} />
    </Container>
  );
}
