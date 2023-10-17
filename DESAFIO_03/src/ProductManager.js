import fs from 'fs/promises';

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = [];
  }

  async loadProducts() {
    try {
      const data = await fs.readFile(this.path, 'utf8');
      this.products = JSON.parse(data);
      return this.products;
    } catch (err) {
      console.log('Error al cargar los productos:');
      return [];
    }
  }

  addProduct(product) {
    this.products.push(product);
  }

  getProducts() {
    return this.products;
  }
}

export default ProductManager;
