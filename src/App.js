import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
import { Products, Navbar } from './components';

const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});


    /**
     * getting products from CommerceJS
     * API CALL
     */
    const fetchProducts = async () => {
        const { data } = await commerce.products.list();
        setProducts(data);
    }

    /**
     * Handling the cart
     * getting cart from CommerceJS
     * API CALL
     */
    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve());
    }

    /**
     * adding to cart pushing to CommerceJS
     * API CALL
     */
    const handleAddToCart = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity);
        setCart(item);
    }

    useEffect(() => {
        fetchCart();
        fetchProducts();
    }, []);

    console.log(cart);

    return (
        <div>
            <Navbar totalItems={cart.total_items} />
            <Products products={products} onAddToCart={handleAddToCart}/>
        </div>
    )
}

export default App;