import express from 'express';
import ProductManager from './productmanager.js';
import markdownContent from './markdownProcessor.mjs';

const manager = new ProductManager('./productos.json');

manager.loadProducts();

const app = express();

app.get('/', (req, res) => {
  res.send(markdownContent);
});

app.get('/products', (req, res) => {
  const limit = req.query.limit;
  const products = manager.getProducts();

  if (limit) {
    const limitedProducts = products.slice(0, parseInt(limit, 10));
    return res.json({ products: limitedProducts });
  } else {
    return res.json({ products });
  }
});

app.get('/products/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);
  const product = manager.getProducts().find((p) => p.id === productId);

  if (product) {
    return res.json({ product });
  } else {
    console.log('Producto no encontrado');
    return res.status(404).send('Producto no encontrado');
  }
});

app.listen(8080, () => {
  console.log('Servidor escuchando en el puerto 8080');
});
