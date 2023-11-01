import express from 'express';
import productsRouter from './router/products.js';
import cartsRouter from './router/carts.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => res.send('OK'));

app.use('/api/products', productsRouter);

app.use('/api/carts', cartsRouter);

app.listen(8080, () => {
    console.log(`Servidor escuchando en el puerto 8080`);
});
