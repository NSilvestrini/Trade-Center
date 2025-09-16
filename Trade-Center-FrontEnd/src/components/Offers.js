import React from 'react';
import ProductCard from './ProductCard';

function Offers({ addToCart }) {
    return (
        <div className="container">
            <div className="page-content">
                <h2 className="section-title">Ofertas Especiais</h2>
                <p style={{textAlign: 'center'}}>Aproveite nossas melhores ofertas com descontos imperdíveis!</p>
                
                <div className="products">
                    <ProductCard 
                        id={13}
                        name="Vinho Tinto Reserva - 750ml" 
                        price="49.90" 
                        oldPrice="69.90" 
                        cashback="15%" 
                        image="https://vinicolafin.com.br/wp-content/uploads/2020/03/Cabernet-Sauvignon-Site.jpg"
                        onAddToCart={addToCart}
                    />
                    <ProductCard 
                        id={14}
                        name="Queijo Parmesão - 300g" 
                        price="24.90" 
                        oldPrice="32.90" 
                        cashback="7%" 
                        image="https://images-na.ssl-images-amazon.com/images/I/81ffsT72HyL._AC_UL600_SR600,600_.jpg"
                        onAddToCart={addToCart}
                    />
                    <ProductCard 
                        id={15}
                        name="Chocolate Belga - 250g" 
                        price="19.90" 
                        oldPrice="29.90" 
                        cashback="9%" 
                        image="https://cdn.awsli.com.br/600x700/1981/1981127/produto/230124624b5729e6b28.jpg"
                        onAddToCart={addToCart}
                    />
                    <ProductCard 
                        id={16}
                        name="Geleia de Norango - 240g" 
                        price="15.90" 
                        oldPrice="21.90" 
                        cashback="5%" 
                        image="https://static.shambalaloja.com.br/public/shambala/imagens/produtos/geleia-de-morango-sem-acucar-240g-organica-6792287bee1a3.jpg"
                        onAddToCart={addToCart}
                    />
                </div>
            </div>
        </div>
    );
}

export default Offers;