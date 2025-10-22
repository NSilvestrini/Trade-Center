import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

function Products({ addToCart }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetch("http://localhost:8080/produtos") // teu endpoint Java
            .then(res => {
                if (!res.ok) throw new Error("Erro ao carregar produtos");
                return res.json();
            })
            .then(data => {
                // converte os dados do backend (TB_PRODUTO)
                const mapped = data.map(p => ({
                    id: p.idProduto,
                    name: p.nome,
                    price: p.valor.toFixed(2),
                    oldPrice: (p.valor * 1.15).toFixed(2), // exemplo de preço anterior
                    cashback: "5%",
                    image: "https://via.placeholder.com/250", // placeholder
                    descricao: p.descricao
                }));
                setProducts(mapped);
                setLoading(false);
            })
            .catch(err => {
                console.error("Erro ao buscar produtos:", err);
                // fallback: usa os mocks se o backend falhar
                setProducts([
                    { id: 1, name: "Arroz Tipo 1 - 5kg", price: "22.90", oldPrice: "27.90", cashback: "5%", image: "https://prezunic.vtexassets.com/arquivos/ids/180742/65678a821ef3739680761582.jpg?v=638368812869870000" },
                    { id: 2, name: "Café Premium - 500g", price: "15.90", oldPrice: "19.90", cashback: "7%", image: "https://prezunic.vtexassets.com/arquivos/ids/178518/65674ee20ed0163ddfa4457b.jpg?v=638368660302600000" }
                ]);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Carregando produtos...</div>;
    
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