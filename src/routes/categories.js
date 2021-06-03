import express from 'express';
import { storeCategory, getAllCategories, getAllCategoriesById, updateCategories, deleteCategory } from '../models/Category.js';

const router = express.Router();

router.get('/', (req, res) => {
    const categories = getAllCategories();
    res.json(categories);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const category = getAllCategories();
    if (category) {
        res.json(category);
        return;
    };
    res.status(404).json({error:'Category not found'});
});

router.post('/', (req, res) => {
    console.log(req.body);
    storeCategory(req.body);
    res.json({success: true});
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const category = getAllCategoriesById(id);
    if (!category) {
        res.status(404).json({error:'Category not found'});
        return;
    }
    updateCategories(id, category, req.body);
    res.json({success: true});
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const category = getAllCategoriesById(id);
    if (!category) {
        res.status(404).json({error:'Category not found'});
        return;
    }
    deleteCategory(id);
    res.json({success: true});
});

export default router;