import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
import { Products, Navbar, Cart } from './components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
        const response = await commerce.cart.retrieve();
        setCart(response);
    }

    /**
     * adding to cart pushing to CommerceJS
     * API CALL
     */
    const handleAddToCart = async (productId, quantity) => {
        const response = await commerce.cart.add(productId, quantity);
        setCart(response);
    }

    /**
     * updating quantity of item in cart by pushing to CommerceJS
     * API CALL
     */
    const handleUpdateCartQty = async (productId, quantity) => {
        const response = await commerce.cart.update(productId, { quantity });
        setCart(response);
    }

    /**
     * delete from cart by calling CommerceJS
     * API CALL
     */
    const handleRemoveFromCart = async (productId) => {
        const response = await commerce.cart.remove(productId);
        setCart(response);
    } 

    /**
     * delete all from cart by calling CommerceJS
     * API CALL
     */
    const handleEmptyCart = async () => {
        const response = await commerce.cart.empty();
        setCart(response);
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);
    console.log(cart);

    return (
        <Router>    
            <div>
                <Navbar totalItems={cart.total_items} />
                <Routes>
                    <Route exact path='/' element={<Products products={products} onAddToCart={handleAddToCart}/>}/>
                    <Route exact path='/cart' element={
                        <Cart 
                            cart={cart} 
                            handleUpdateCartQty={handleUpdateCartQty}
                            handleRemoveFromCart={handleRemoveFromCart}
                            handleEmptyCart={handleEmptyCart}
                        />
                    }/>
                </Routes>
            </div>
        </Router>
    )
}

export default App;