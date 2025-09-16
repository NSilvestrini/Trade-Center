package main.java.br.com.fiap.tradecenter.models;

public class Compra {
    private int idCompra;
    private int idCliente;
    private int idProducto;
    private int quantidade;
    private double valor;


    //Getter e Setter IdCompra
    public int getIdCompra() {
        return idCompra;
    }
    public void setIdCompra(int idCompra) {
        this.idCompra = idCompra;
    }

    //Getter e Setter IdCliente
    public int getIdCliente() {
        return idCliente;
    }
    public void setIdCliente(int idCliente) {
        this.idCliente = idCliente;
    }

    //Getter e Setter IdProduto
    public int getIdProducto() {
        return idProducto;
    }
    public void setIdProducto(int idProducto) {
        this.idProducto = idProducto;
    }

    //Getter e Setter Quantidade
    public int getQuantidade() {
        return quantidade;
    }
    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }

    //Getter e Setter Valor
    public double getValor() {
        return valor;
    }
    public void setValor(double valor) {
        this.valor = valor;
    }
}
