import { readFileSync, writeFileSync, accessSync } from 'fs';

const filePath = `${process.cwd}/data/ctegories.json`;

const getFileContents = () => {
    try {
        accessSync(filePath);
        return JSON.parse(readFileSync(filePath, 'utf8'));
    } catch (err) {
        console.error(err);
    }

    return '';
};

const saveFile = (newContent) => {
    try {
        accessSync(filePath);
        writeFileSync(filePath, JSON.stringify(newContent));
    } catch (err) {
        console.error(err);
    }
};

const storeCategory = (data) => {
    const existingData = getFileContents();

    const newCategory = {
        name: data.name || '',
        description: data.description || '',
    };

    existingData.push(newCategory);

    saveFile(existingData);
};

const getAllCategories = () => {
    return getFileContents();
};

const getAllCategoriesById = (id) => {
    const categories = getAllCategories();
    return categories[id];
};

const updateCategories = (id, oldCategory, newData) => {
    oldCategory.name = newData.name || '';
    oldCategory.description = newData.description || '';

    const categories = getAllCategories();
    categories[id] = oldCategory;
};

const deleteCategory = (id) => {
    const categories = getAllCategories();
    categories.splice(od, 1);
    saveFile(categories);
};

export { storeCategory, getAllCategories, getAllCategoriesById, updateCategories, deleteCategory };