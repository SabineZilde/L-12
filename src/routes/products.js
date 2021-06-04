import express from 'express';
import { storeProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from '../models/Product.js';

const router = express.Router();

router.get('/', (req, res) => {
    const products = getAllProducts();
    res.json(products);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const product = getProductById(id);
    if (product) {
        res.json(product);
        return;
    };
    res.status(404).json({error: 'Product not found'});
});

router.post('/', (req, res) => {
    storeProduct(req.body);
    res.json({success: true});
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const product = getProductById(id);
    if (!product) {
        res.status(404).json({error: 'Not found'});
        return;
    };
    updateProduct(id, product, req.body);
    res.json({success: true});
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const product = getProductById(id);
    if (!product) {
        res.status(404).json({error: 'Not found'});
        return;
    };
    deleteProduct(id);
    res.json({success: true});
});

export default router;
