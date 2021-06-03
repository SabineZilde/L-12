import express from 'express';
import dotenv from 'dotenv';
import productsRoutes from './routes/products.js';
import categoriesRoutes from './routes/categories.js';
import bodyParser from 'body-parser';

const server = express();
dotenv.config();
server.use(bodyParser.json());

server.use('/products', productsRoutes);
server.use('/categories', categoriesRoutes);


server.listen(process.env.PORT, () => {
    console.log(`Express is up and running on port ${process.env.PORT}`);
})