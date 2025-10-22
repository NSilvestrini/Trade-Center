package br.com.fiap.tradecenter.dao;

import br.com.fiap.tradecenter.models.Produto;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ProdutoDAO {

    private final Connection connection;

    public ProdutoDAO(Connection connection) {
        this.connection = connection;
    }

    // Conta todos os produtos na tabela
    public int contarProdutos() throws SQLException {
        String sql = "SELECT COUNT(*) FROM TB_PRODUTO";
        try (PreparedStatement stmt = connection.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {

            if (rs.next()) {
                return rs.getInt(1);
            }
        }
        return 0;
    }


    //Lista todos os produtos na tabela
    public List<Produto> listarProdutos() throws SQLException {
        String sql = "SELECT ID_PRODUTO, VALOR, NOME, DESCRICAO FROM TB_PRODUTO";
        List<Produto> produtos = new ArrayList<>();

        try (PreparedStatement ps = connection.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                produtos.add(new Produto(
                    rs.getInt("ID_PRODUTO"),
                    rs.getDouble("VALOR"),
                    rs.getString("NOME"),
                    rs.getString("DESCRICAO")
                ));
            }
        }
        return produtos;
    }
}
