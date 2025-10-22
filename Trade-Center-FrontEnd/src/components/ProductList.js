import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/produtos")
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao carregar produtos");
        return res.json();
      })
      .then((data) => {
        const mapped = data.map((p) => ({
          id: p.idProduto,
          name: p.nome,
          price: p.valor.toFixed(2),
          oldPrice: (p.valor * 1.15).toFixed(2),
          cashback: "5%",
          image: "https://via.placeholder.com/250",
          descricao: p.descricao,
        }));
        setProducts(mapped);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar produtos:", err);
        setProducts([
          {
            id: 1,
            name: "Arroz Tipo 1 - 5kg",
            price: "22.90",
            oldPrice: "27.90",
            cashback: "5%",
            image:
              "https://prezunic.vtexassets.com/arquivos/ids/180742/65678a821ef3739680761582.jpg?v=638368812869870000",
          },
          {
            id: 2,
            name: "Café Premium - 500g",
            price: "15.90",
            oldPrice: "19.90",
            cashback: "7%",
            image:
              "https://prezunic.vtexassets.com/arquivos/ids/178518/65674ee20ed0163ddfa4457b.jpg?v=638368660302600000",
          },
        ]);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Carregando produtos...</div>;

  return (
    <div
      className="product-list"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: "center",
      }}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          {...product}
          onAddToCart={(p) => console.log("Adicionado ao carrinho:", p)}
        />
      ))}
    </div>
  );
}

export default ProductList;