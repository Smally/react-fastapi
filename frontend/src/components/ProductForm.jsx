import React, { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";

export default function ProductForm({ onAdd }) {
  const [name, setName] = useState("");
  const [batch, setBatch] = useState("");
  const [stock, setStock] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!name.trim() || isNaN(stock)) {
      alert("Please enter a valid name and stock quantity.");
      return;
    }

    const newProduct = {
      name: name.trim(),
      batch: batch.trim(),
      stock: parseInt(stock),
    };

    onAdd(newProduct);

    // Reset form
    setName("");
    setBatch("");
    setStock("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row" spacing={2} mb={2}>
        <TextField
          label="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Batch"
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
          required
        />
        <TextField
          label="Stock Quantity"
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />
        <Button variant="contained" color="primary" type="submit">
          Add
        </Button>
      </Stack>
    </form>
  );
}
