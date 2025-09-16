import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

function Products({ addToCart }) {
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        const mockProducts = [
            // 
            { id: 1, name: "Arroz Tipo 1 - 5kg", price: "22.90", oldPrice: "27.90", cashback: "5%", image: "https://prezunic.vtexassets.com/arquivos/ids/180742/65678a821ef3739680761582.jpg?v=638368812869870000" },
            { id: 2, name: "Café Premium - 500g", price: "15.90", oldPrice: "19.90", cashback: "7%", image: "https://prezunic.vtexassets.com/arquivos/ids/178518/65674ee20ed0163ddfa4457b.jpg?v=638368660302600000" },
            { id: 3, name: "Azeite de Oliva - 500ml", price: "29.90", oldPrice: "35.90", cashback: "10%", image: "https://applicativa-marketplace-prod.s3.amazonaws.com/produtos/azeite-de-oliva-extra-virgem-cocinero-250ml-2.webp" },
            { id: 4, name: "Leite Integral - 12 unidades", price: "25.90", oldPrice: "29.90", cashback: "3%", image: "https://m.media-amazon.com/images/I/71r+BXax3SL.jpg" },
            { id: 5, name: "Macarrão Espaguete - 500g", price: "4.90", oldPrice: "5.90", cashback: "4%", image: "https://bretas.vtexassets.com/arquivos/ids/185545-800-auto?v=638375504479470000&width=800&height=auto&aspect=true" },
            { id: 6, name: "Óleo de Soja - 900ml", price: "5.90", oldPrice: "6.90", cashback: "2%", image: "https://prezunic.vtexassets.com/arquivos/ids/179230/656789221ef3739680760f87.jpg?v=638368809343900000" },
            { id: 7, name: "Sabão em Pó - 1kg", price: "12.90", oldPrice: "15.90", cashback: "6%", image: "https://images.tcdn.com.br/img/img_prod/767437/sabao_em_po_omo_pacote_1kg_1017_1_20200408102937.jpg" },
            { id: 8, name: "Cerveja Artesanal - 600ml", price: "18.90", oldPrice: "22.90", cashback: "8%", image: "https://m.media-amazon.com/images/I/61yXkI0qnaL._UF1000,1000_QL80_.jpg" },
            { id: 9, name: "Smartphone Galaxy S21", price: "1899.90", oldPrice: "2199.90", cashback: "8%", image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
            { id: 10, name: "Fritadeira Elétrica", price: "249.90", oldPrice: "299.90", cashback: "12%", image: "https://io.convertiez.com.br/m/lojasedmil/shop/products/images/1268/medium/fritadeira-eletrica-air-fryer-com-4-litros-e-1500w-afn40bi-mondial-preta-e-inox_15254.jpg" },
            { id: 11, name: "TV LED 55'' 4K", price: "2199.90", oldPrice: "2599.90", cashback: "6%", image: "https://fujiokadistribuidor.vteximg.com.br/arquivos/ids/164510" },
            { id: 12, name: "Notebook Dell i7", price: "3299.90", oldPrice: "3799.90", cashback: "10%", image: "https://images.tcdn.com.br/img/img_prod/15959/notebook_dell_inspiron_intel_core_i7_11a_geracao_8gb_ssd_256gb_nvme_tela_15_6_17812_1_332e5eb30c7cdb7548572c773aa92f53.jpg" }
        ];
        
        setProducts(mockProducts);
    }, []);
    
    return (
        <div className="container">
            <h2 className="section-title">Nossos Produtos</h2>
            <div className="products">
                {products.map(product => (
                    <ProductCard 
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        oldPrice={product.oldPrice}
                        cashback={product.cashback}
                        image={product.image}
                        onAddToCart={addToCart}
                    />
                ))}
            </div>
        </div>
    );
}

export default Products;