import React from 'react';
import ProductCard from './ProductCard';
import RegisterForm from './RegisterForm';
import ProductList from './ProductList';

function Home({ setCurrentView, addToCart }) {
    return (
        <div>
            <section className="banner">
                <div className="container">
                    <h1>Bem-vindo ao TRADE CENTER</h1>
                    <p>Seu supermercado online com os melhores preços e cashback!</p>
                    <a href="/" className="btn" onClick={(e) => { e.preventDefault(); setCurrentView('register'); }}>
                        Comece agora <i className="fas fa-arrow-right"></i>
                    </a>
                </div>
            </section>
            
            <div className="container">
                <h2 className="section-title">Destaques</h2>
                <div>
                   <ProductList />
                </div>
                
                <h2 className="section-title">Ofertas Especiais</h2>
                <div className="products">
                    <ProductCard 
                        id={9}
                        name="Smartphone Galaxy S21" 
                        price="1899.90" 
                        oldPrice="2199.90" 
                        cashback="8%" 
                        image="https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                        onAddToCart={addToCart}
                    />
                    <ProductCard 
                        id={10}
                        name="Fritadeira Elétrica" 
                        price="249.90" 
                        oldPrice="299.90" 
                        cashback="12%" 
                        image="https://io.convertiez.com.br/m/lojasedmil/shop/products/images/1268/medium/fritadeira-eletrica-air-fryer-com-4-litros-e-1500w-afn40bi-mondial-preta-e-inox_15254.jpg"
                        onAddToCart={addToCart}
                    />
                    <ProductCard 
                        id={11}
                        name="TV LED 55'' 4K" 
                        price="2199.90" 
                        oldPrice="2599.90" 
                        cashback="6%" 
                        image="https://fujiokadistribuidor.vteximg.com.br/arquivos/ids/164510"
                        onAddToCart={addToCart}
                    />
                    <ProductCard 
                        id={12}
                        name="Notebook Dell i7" 
                        price="3299.90" 
                        oldPrice="3799.90" 
                        cashback="10%" 
                        image="https://images.tcdn.com.br/img/img_prod/15959/notebook_dell_inspiron_intel_core_i7_11a_geracao_8gb_ssd_256gb_nvme_tela_15_6_17812_1_332e5eb30c7cdb7548572c773aa92f53.jpg"
                        onAddToCart={addToCart}
                    />
                </div>
                
                <div className="form-section">
                    <h2 className="form-title">Cadastre-se e ganhe 10% de cashback na primeira compra!</h2>
                    <RegisterForm userType="client" setCurrentView={setCurrentView} />
                </div>
            </div>
        </div>
    );
}

export default Home;