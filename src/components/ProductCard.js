import React from 'react';

function ProductCard({ id, name, price, oldPrice, cashback, image, onAddToCart }) {
    const handleAddToCart = () => {
        onAddToCart({
            id,
            name,
            price,
            image,
            cashback
        });
    };
    
    return (
        <div className="product-card animate">
            <div className="product-image">
                <img src={image} alt={name} />
            </div>
            <div className="product-info">
                <h3 className="product-title">{name}</h3>
                <div className="product-price">
                    <span className="old-price">R$ {oldPrice}</span>
                    <span>R$ {price}</span>
                </div>
                <div className="cashback-badge">{cashback} cashback</div>
                <button className="add-to-cart" onClick={handleAddToCart}>Adicionar ao carrinho</button>
            </div>
        </div>
    );
}

export default ProductCard;