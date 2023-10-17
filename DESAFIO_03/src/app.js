import express from 'express';
import ProductManager from './productmanager.js';
import markdownContent from './markdownProcessor.mjs';

const manager = new ProductManager('./productos.json');

async function loadProducts() {
  try {
    await manager.loadProducts();
    console.log('Productos cargados exitosamente');
  } catch (error) {
    console.log('Error al cargar los productos:');
  }
}

loadProducts();

const app = express();

app.get('/', (req, res) => {
  res.send(markdownContent);
});

app.get('/products', async (req, res) => {
  const limit = req.query.limit;

  try {
    await manager.loadProducts();
    const products = manager.getProducts();

    if (limit) {
      const limitedProducts = products.slice(0, parseInt(limit, 10));
      res.json({ products: limitedProducts });
    } else {
      res.json({ products });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al cargar los productos' });
  }
});

app.get('/products/:pid', async (req, res) => {
  const productId = parseInt(req.params.pid);

  try {
    await manager.loadProducts();
    const products = manager.getProducts();
    const product = products.find((p) => p.id === productId);

    if (product) {
      res.json({ product });
    } else {
      console.log('Producto no encontrado');
      res.status(404).send('Producto no encontrado');
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al cargar los productos' });
  }
});

app.listen(8080, () => {
  console.log('Servidor Express escuchando en el puerto 8080');
});
