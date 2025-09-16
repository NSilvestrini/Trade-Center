import React from 'react';

function Cart({ cart, removeFromCart, updateQuantity, calculateTotal, onCheckout, setCurrentView }) {
    if (cart.length === 0) {
        return (
            <div className="container">
                <div className="page-content">
                    <h2 className="section-title">Meu Carrinho</h2>
                    <div className="empty-cart">
                        <i className="fas fa-shopping-cart"></i>
                        <p>Seu carrinho está vazio</p>
                        <button className="btn" onClick={() => setCurrentView('products')}>
                            Continuar Comprando
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    
    return (
        <div className="container">
            <div className="page-content">
                <h2 className="section-title">Meu Carrinho</h2>
                
                <div className="cart-container">
                    <div className="cart-items">
                        {cart.map(item => (
                            <div key={item.id} className="cart-item">
                                <div className="cart-item-image">
                                    <img src={item.image} alt={item.name} />
                                </div>
                                <div className="cart-item-details">
                                    <h3 className="cart-item-title">{item.name}</h3>
                                    <div className="cart-item-price">R$ {item.price}</div>
                                    <div className="cart-item-quantity">
                                        <button 
                                            className="quantity-btn" 
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        >-</button>
                                        <input 
                                            type="number" 
                                            className="quantity-input" 
                                            value={item.quantity} 
                                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                                            min="1"
                                        />
                                        <button 
                                            className="quantity-btn" 
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        >+</button>
                                    </div>
                                    <button 
                                        className="remove-item" 
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        <i className="fas fa-trash"></i> Remover
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="cart-summary">
                        <h3>Resumo do Pedido</h3>
                        
                        {cart.map(item => (
                            <div key={item.id} className="summary-row">
                                <span>{item.name} x {item.quantity}</span>
                                <span>R$ {(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                        
                        <div className="summary-total">
                            <span>Total</span>
                            <span>R$ {calculateTotal()}</span>
                        </div>
                        
                        <button className="checkout-btn" onClick={onCheckout}>
                            Finalizar Compra
                        </button>
                        
                        <button 
                            className="btn" 
                            style={{width: '100%', marginTop: '15px', background: '#6c757d'}}
                            onClick={() => setCurrentView('products')}
                        >
                            Continuar Comprando
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;