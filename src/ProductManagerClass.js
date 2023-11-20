class ProductManager {
    constructor() {
      this.products = this.generateInitialProducts();
    }
  
    // Método para generar al menos diez productos iniciales
    generateInitialProducts() {
      const initialProducts = [];
      for (let i = 1; i <= 10; i++) {
        initialProducts.push({
          id: i,
          title: `Producto ${i}`,
          description: `Descripción del Producto ${i}`,
          price: i * 10,
          thumbnail: `imagen${i}.jpg`,
          code: `ABC${i}`,
          stock: i * 5
        });
      }
      return initialProducts;
    }
  
    getProducts() {
      return this.products;
    }
  
    addProduct(title, description, price, thumbnail, code, stock) {
      const id = this.generateUniqueId();
      const newProduct = { id, title, description, price, thumbnail, code, stock };
      this.products.push(newProduct);
      return newProduct;
    }
  
    getProductById(id) {
      const product = this.products.find(product => product.id === id);
      if (!product) {
        throw new Error("Producto no encontrado");
      }
      return product;
    }
  
    updateProduct(id, updatedFields) {
      const productIndex = this.products.findIndex(product => product.id === id);
      if (productIndex === -1) {
        throw new Error("Producto no encontrado");
      }
  
      // No permitir cambios en el ID
      updatedFields.id = id;
  
      // Actualizar campos del producto
      this.products[productIndex] = { ...this.products[productIndex], ...updatedFields };
  
      return this.products[productIndex];
    }
  
    deleteProduct(id) {
      const initialLength = this.products.length;
      this.products = this.products.filter(product => product.id !== id);
      if (this.products.length === initialLength) {
        throw new Error("Producto no encontrado");
      }
    }
  
    generateUniqueId() {
      // Implementación sencilla de generación de ID único (podría mejorarse)
      return Math.random().toString(36).substr(2, 9);
    }
  }
  
  // Ejemplo de uso
  const productManager = new ProductManager();
  
  console.log("getProducts inicial:", productManager.getProducts());
  
  const newProduct = productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
  
  console.log("getProducts después de agregar producto:", productManager.getProducts());
  
  const retrievedProduct = productManager.getProductById(newProduct.id);
  console.log("getProductById:", retrievedProduct);
  
  const updatedProduct = productManager.updateProduct(newProduct.id, { price: 250 });
  console.log("updateProduct:", updatedProduct);
  
  productManager.deleteProduct(newProduct.id);
  console.log("getProducts después de eliminar producto:", productManager.getProducts());
  
  module.exports = ProductManager;