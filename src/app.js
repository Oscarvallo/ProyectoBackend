const express = require('express');
const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));

let productos = [
  { nombre: "Bizcochitos 9 de oro", id: 1 },
  { nombre: "Alfajor Aguila", id: 2 },
  { nombre: "Coca Cola 2,25l", id: 3 },
  { nombre: "7up 2,25l", id: 4 },
  { nombre: "Leche LaSerenisima", id: 5 },
  { nombre: "Mayonesa Natura 950gr", id: 6 },
  { nombre: "Yerba Playadito 1kg", id: 7 },
  { nombre: "Docena de Huevos", id: 8 },
  { nombre: "Chicle Beldent Menta", id: 9 },
  { nombre: "Ades 1L", id: 10 },
];

// Ruta para devolver todos los productos
app.get("/products", (req, res) => {
  res.json(productos);
});

// Ruta para devolver los primeros n productos
app.get("/limited-products", (req, res) => {
  const limit = parseInt(req.query.limit);
  if (isNaN(limit) || limit <= 0) {
    res.status(400).json({ error: "El parámetro limit debe ser mayor a 0" });
    return;
  }

  let productosLimitados = productos.slice(0, limit);

  // Si el parámetro limit es mayor que el número de productos, devolvemos la matriz completa
  if (limit >= productos.length) {
    productosLimitados = productos;
  }

  // Devolvemos la nueva matriz
  res.json(productosLimitados);
});

// Ruta para devolver un producto por su ID
app.get("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const productoEncontrado = productos.find((producto) => producto.id === id);

  if (!productoEncontrado) {
    res.status(404).json({ error: "El producto con ID " + id + " no existe" });
    return;
  }

  // Devolvemos el producto encontrado
  res.json(productoEncontrado);
});

// Arranca el servidor
app.listen(port, () => {
  console.log("Servidor escuchando en el puerto 8080");
});
