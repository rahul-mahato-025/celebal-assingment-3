const express = require("express");

const app = express();

const productData = [
  {
    id: 0,
    name: "Iphone 11",
  },
  {
    id: 1,
    name: "Iphone 12",
  },
];

// Middleware for parsing
app.use(express.json());

// GET All Products
app.get("/products", function (req, res) {
  return res.status(200).json({
    data: productData,
    message: "Fetched products data",
    success: true,
    error: {},
  });
});

// POST a new Product
app.post("/products", function (req, res) {
  const newProduct = { id: productData.length, name: req.body.name };
  productData.push(newProduct);
  return res.status(201).json({
    data: newProduct,
    message: "Created a new product",
    success: true,
    error: {},
  });
});

// Patch request
function findById(id) {
  const product = productData.filter((product) => product.id === id);
  return product[0];
}

app.patch("/products/:id", function (req, res) {
  const product = productData.findById(req.params.id);
  product = { ...product, ...req.body.data };
  return res.status(200).json({
    data: product,
    message: `Updated the product with id ${req.params.id}`,
    success: true,
    error: {},
  });
});

// Delete request
app.delete("/products/:id", function (req, res) {
  const products = productData.filter(
    (product) => product.id !== req.params.id
  );
  productData = products;
  return res.status(200).json({
    data: productData,
    message: `Deleted the product with id ${req.params.id}`,
    success: true,
    error: {},
  });
});

app.listen(3001, () => console.log("Server started on port 3000"));
