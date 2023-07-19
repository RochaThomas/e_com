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
        <Router>    
            <div>
                <Navbar totalItems={cart.total_items} />
                <Routes>
                    <Route exact path='/' element={<Products products={products} onAddToCart={handleAddToCart}/>}/>
                    <Route exact path='/cart' element={<Cart cart={cart} />}/>
                </Routes>
            </div>
        </Router>
    )
}

export default App;