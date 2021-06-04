import { readFileSync, writeFileSync, accessSync } from 'fs';

const filePath = `${process.cwd()}/data/products.json`

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

const storeProduct = (data) => {
    const existingData = getFileContents();

    const newProduct = {
        name: data.name || '',
        description: data.description || '',
        price: data.price || 0, //(float) parseFloat(data.price)?
        category: data.category || 0, //(int) - this should point to an ID in "categories" database.
    };

    existingData.push(newProduct);

    saveFile(existingData);
};

const getAllProducts = () => {
    return getFileContents();
};

const getProductById = (id) => {
    const products = getAllProducts();
    return products[id];
};

const updateProduct = (id, product, newData) => {
    product.name = newData.name || '';
    product.description = newData.description || '';
    product.price = newData.price || 0;
    product.category = newData.category;

    const products = getAllProducts();
    products[id] = product;

    saveFile(products);
};

const deleteProduct = (id) => {
    const products = getAllProducts();
    products.splice(id, 1);
    saveFile(products);
};

export { storeProduct, getAllProducts, getProductById, updateProduct, deleteProduct };