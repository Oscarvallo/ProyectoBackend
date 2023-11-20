// Dentro de app.js
const express = require('express');
const ProductManager = require('./ProductManagerClass'); // Ajusta la ruta según tu estructura de carpetas

const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));

const productManager = new ProductManager();

// Ruta para devolver todos los productos o un número limitado
app.get("/products", (req, res) => {
  res.json(productManager.getProducts());
});

// Ruta para devolver los primeros n productos
// Ruta para devolver los primeros n productos
app.get("/products/limited", (req, res) => {
  const limit = parseInt(req.query.limit);
  if (isNaN(limit) || limit <= 0) {
    res.status(400).json({ error: "El parámetro limit debe ser mayor a 0" });
    return;
  }

  const totalProducts = productManager.getProducts().length;

  // Verificar si limit es menor que la cantidad total de productos
  if (limit < totalProducts) {
    const limitedProducts = productManager.getProducts().slice(0, limit);
    res.json(limitedProducts);
  } else {
    // Si el parámetro limit es mayor o igual a la cantidad total, devolver todos los productos
    res.json(productManager.getProducts());
  }
});

// Ruta para devolver un producto por su ID
app.get("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  try {
    const product = productManager.getProductById(productId);
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Arranca el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
