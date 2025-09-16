import React from 'react';

function Header({ setCurrentView, user, cartCount }) {
    return (
        <header>
            <div className="container">
                <div className="header-top">
                    <a href="/" className="logo" onClick={(e) => { e.preventDefault(); setCurrentView('home'); }}>
                        <i className="fas fa-store"></i> TRADE CENTER
                    </a>
                    <div className="search-bar">
                        <input type="text" placeholder="O que você está procurando?" />
                        <button><i className="fas fa-search"></i></button>
                    </div>
                    <div className="user-actions">
                        {user ? (
                            <span>Olá, {user.name}</span>
                        ) : (
                            <a href="/" onClick={(e) => { e.preventDefault(); setCurrentView('register'); }}>
                                <i className="fas fa-user"></i> Entrar
                            </a>
                        )}
                        <a href="/" onClick={(e) => { e.preventDefault(); setCurrentView('cart'); }}>
                            <i className="fas fa-shopping-cart"></i> Carrinho
                            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                        </a>
                    </div>
                </div>
                <nav>
                    <ul>
                        <li><a onClick={() => setCurrentView('home')}>Home</a></li>
                        <li><a onClick={() => setCurrentView('products')}>Produtos</a></li>
                        <li><a onClick={() => setCurrentView('offers')}>Ofertas</a></li>
                        <li><a onClick={() => setCurrentView('cashback')}>Cashback</a></li>
                        <li><a onClick={() => setCurrentView('support')}>Atendimento</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;