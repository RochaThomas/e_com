import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
import { Products, Navbar, Cart } from './components';

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
    const fetchCart = () => {
        commerce.cart.retrieve().then((cart) => {
            setCart(cart);
        }).catch((error) => {
            console.log('There was an error fetching the cart: ', error);
        })
        // setCart(await commerce.cart.retrieve());
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
        fetchProducts();
        fetchCart();
        console.log(cart);
    }, []);
    

    return (
        <div>
            <Navbar totalItems={cart.total_items} />
            {/* <Products products={products} onAddToCart={handleAddToCart}/> */}
            <Cart cart={cart} />
        </div>
    )
}

export default App;