import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
import { Products, Navbar, Cart, Checkout } from './components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

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

    /**
     * refresh/make a new cart by calling CommerceJS
     * API CALL
     */
    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh();
        console.log('new: ', newCart);
        setCart(newCart);
    }

    /**
     * capture checkout submission by calling CommerceJS
     * API CALL
     */
    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        try {
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
            setOrder(incomingOrder);
            refreshCart();
        } catch (error) {
            setErrorMessage(error.data.error.message);
        }
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

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
                    <Route exact path='/checkout' element={
                        <Checkout 
                            cart={cart}  
                            order={order}
                            onCaptureCheckout={handleCaptureCheckout}
                            error={errorMessage}
                        />
                    }/>
                </Routes>
            </div>
        </Router>
    )
}

export default App;