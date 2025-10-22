package br.com.fiap.tradecenter.repository;

import br.com.fiap.tradecenter.config.OracleConnection;
import br.com.fiap.tradecenter.models.Compra;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

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


     public ArrayList<Compra> listar() {
        ArrayList<Compra> compras = new ArrayList<>();
        String sql = "SELECT id, usuario_id, valor FROM compra";

        try (Connection conn = OracleConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                Compra c = new Compra();
                c.setIdCompra(rs.getInt("id"));
                c.setIdCliente(rs.getInt("usuario_id"));
                c.setValor(rs.getDouble("valor"));
                compras.add(c);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return compras;
    }


}
