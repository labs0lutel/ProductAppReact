import React, { useState } from 'react';
import './ProductApp.css'; 

const ProductApp = () => {
    const [products, setProducts] = useState([
        { id: 1, name: 'Велосипед', price: 1000, count: 1 },
        { id: 2, name: 'Самокат', price: 700, count: 1 },
        { id: 3, name: 'Ролики', price: 1300, count: 2 },
        { id: 4, name: 'Сноуборд', price: 19000, count: 4 }
]);

const [newProductName, setNewProductName] = useState('');
const [newProductPrice, setNewProductPrice] = useState('');

const addProduct = () => {
    if (newProductName && newProductPrice) {
        const newProduct = {
            id: Date.now(),
            name: newProductName,
            price: parseFloat(newProductPrice),
            count: 1
        };
        setProducts([...products, newProduct]);
        setNewProductName('');
        setNewProductPrice('');
    }
};

const incrementCount = (id) => {
    setProducts(products.map(product => 
        product.id === id && product.count < 25 
        ? { ...product, count: product.count + 1 }
        : product
    ));
};

const decrementCount = (id) => {
    setProducts(products.map(product => 
        product.id === id && product.count > 0
        ? { ...product, count: product.count - 1 }
        : product
    ));
};

const removeProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
};

return (
    <div className="product-app">
        <div className="add-product-box">
            <div className="add-product-form">
                <input 
                  type="text" 
                  placeholder="Название товара" 
                  value={newProductName} 
                  onChange={(e) => setNewProductName(e.target.value)} 
                />
                <input 
                  type="number" 
                  placeholder="Цена товара" 
                  value={newProductPrice} 
                  onChange={(e) => setNewProductPrice(e.target.value)} 
                />
                <button onClick={addProduct}>Добавить товар</button>
            </div>
        </div>

        <div className="products-list">
            {products.map(product => (
                <div key={product.id} className="product-item-box">
                    <span className="product-name">{product.name}</span>
                    <span className="product-price">{product.price} руб.</span>
                    <div className="product-controls">
                      <button onClick={() => decrementCount(product.id)}>-</button>
                      <span className="product-count">{product.count}</span>
                      <button onClick={() => incrementCount(product.id)}>+</button>
                    </div>
                    {product.count === 0 && removeProduct(product.id)}
                </div>
            ))}
        </div>
    </div>
  );
};

export default ProductApp;
