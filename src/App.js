import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Register from './components/Register';
import Products from './components/Products';
import Offers from './components/Offers';
import Cashback from './components/Cashback';
import Support from './components/Support';
import Cart from './components/Cart';
import Footer from './components/Footer';
import CheckoutModal from './components/CheckoutModal';

function App() {
    const [currentView, setCurrentView] = useState('home');
    const [userType, setUserType] = useState('client');
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);
    const [showCheckoutModal, setShowCheckoutModal] = useState(false);
    
    useEffect(() => {
        const savedCart = localStorage.getItem('tradeCenterCart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);
    
    useEffect(() => {
        localStorage.setItem('tradeCenterCart', JSON.stringify(cart));
    }, [cart]);
    
    const addToCart = (product) => {
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            setCart(cart.map(item => 
                item.id === product.id 
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };
    
    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item.id !== productId));
    };
    
    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(productId);
            return;
        }
        
        setCart(cart.map(item => 
            item.id === productId 
                ? { ...item, quantity: newQuantity }
                : item
        ));
    };
    
    const calculateTotal = () => {
        return cart.reduce((total, item) => {
            return total + (parseFloat(item.price) * item.quantity);
        }, 0).toFixed(2);
    };
    
    const handleCheckout = () => {
        setShowCheckoutModal(true);
    };
    
    const completePurchase = () => {
        alert('Compra finalizada com sucesso! Obrigado por comprar no TRADE CENTER.');
        setCart([]);
        setShowCheckoutModal(false);
        setCurrentView('home');
    };
    
    return (
        <div>
            <Header setCurrentView={setCurrentView} user={user} setUser={setUser} cartCount={cart.reduce((count, item) => count + item.quantity, 0)} />
            <main>
                {currentView === 'home' && <Home setCurrentView={setCurrentView} addToCart={addToCart} />}
                {currentView === 'register' && <Register userType={userType} setUserType={setUserType} setUser={setUser} setCurrentView={setCurrentView} />}
                {currentView === 'products' && <Products addToCart={addToCart} />}
                {currentView === 'offers' && <Offers addToCart={addToCart} />}
                {currentView === 'cashback' && <Cashback />}
                {currentView === 'support' && <Support />}
                {currentView === 'cart' && <Cart cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} calculateTotal={calculateTotal} onCheckout={handleCheckout} setCurrentView={setCurrentView} />}
            </main>
            <Footer setCurrentView={setCurrentView} />
            
            {showCheckoutModal && (
                <CheckoutModal 
                    cart={cart} 
                    total={calculateTotal()} 
                    onClose={() => setShowCheckoutModal(false)} 
                    onComplete={completePurchase} 
                />
            )}
        </div>
    );
}

export default App;