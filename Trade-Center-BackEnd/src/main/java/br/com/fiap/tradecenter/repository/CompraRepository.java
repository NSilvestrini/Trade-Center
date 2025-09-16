package main.java.br.com.fiap.tradecenter.repository;

import main.java.br.com.fiap.tradecenter.config.OracleConnection;
import main.java.br.com.fiap.tradecenter.models.Compra;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class CompraRepository {

    public void salvar(Compra compra) {
        String sql = "INSERT INTO compra (idCompra,idCliente,idProducto,quantidade,valor) VALUES (?,?,?,?,?)";
        try (Connection conn = OracleConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {


            ps.setInt(1,compra.getIdCompra());
            ps.setInt(2,compra.getIdCliente());
            ps.setInt(3,compra.getIdProducto());
            ps.setInt(4,compra.getQuantidade());
            ps.setDouble(5,compra.getValor());

            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }





}
