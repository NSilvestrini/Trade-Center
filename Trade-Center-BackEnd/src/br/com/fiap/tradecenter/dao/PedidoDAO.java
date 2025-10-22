package br.com.fiap.tradecenter.dao;

import br.com.fiap.tradecenter.models.ItemPedido;
import br.com.fiap.tradecenter.models.Pedido;

import java.sql.*;
import java.util.List;

public class PedidoDAO {

    private final Connection conn;

    public PedidoDAO(Connection conn) {
        this.conn = conn;
    }

    // --- NOVO MÉTODO PRINCIPAL COM TRANSAÇÃO ---

    /**
     * Insere o Pedido (header) e todos os seus itens (detalhes) em uma única transação.
     */
    public void criarPedidoCompleto(Pedido pedido, List<ItemPedido> itens) throws SQLException {
        // 1. DESABILITA O AUTO-COMMIT para iniciar a transação
        conn.setAutoCommit(false);

        try {
            // 2. Insere o cabeçalho do pedido e OBTÉM O ID gerado
            int idNovoPedido = inserirPedidoPrincipal(pedido);

            // 3. Insere todos os itens usando o ID retornado
            inserirItens(idNovoPedido, itens);

            // 4. Se tudo funcionou, salva as alterações (COMMIT)
            conn.commit();

        } catch (SQLException e) {
            // 5. Se algo falhou, desfaz tudo (ROLLBACK)
            conn.rollback();
            throw e;
        } finally {
            // 6. Restaura o auto-commit
            conn.setAutoCommit(true);
        }
    }

    // --- NOVO MÉTODO: INSERÇÃO DO CABEÇALHO E RECUPERAÇÃO DO ID ---

    /**
     * Insere o registro na TB_PEDIDOS e retorna o ID_PEDIDO gerado pelo Oracle.
     */
    private int inserirPedidoPrincipal(Pedido pedido) throws SQLException {
        // SQL CORRETO: Apenas VALOR_TOTAL (ID_PEDIDO é gerado automaticamente)
        String sql = "INSERT INTO TB_PEDIDOS (VALOR_TOTAL) VALUES (?)";
        int novoId = -1;

        // Statement.RETURN_GENERATED_KEYS é obrigatório para obter o ID gerado pelo Oracle
        try (PreparedStatement stmt = conn.prepareStatement(sql, new String[]{"ID_PEDIDO"})) {
            stmt.setDouble(1, pedido.valorTotal());

            stmt.executeUpdate();

            // Recupera a chave gerada (ID_PEDIDO)
            try (ResultSet rs = stmt.getGeneratedKeys()) {
                if (rs.next()) {
                    novoId = rs.getInt(1);
                } else {
                    throw new SQLException("Falha ao obter o ID gerado para o Pedido.");
                }
            }
        }
        return novoId;
    }

    // --- MÉTODO EXISTENTE: INSERÇÃO DOS ITENS (Correto) ---

    private void inserirItens(int idPedido, List<ItemPedido> itens) throws SQLException {
        String sql = "INSERT INTO TB_ITENS_PEDIDO (ID_PEDIDO, ID_PRODUTOS, QUANTIDADE, VALOR_UNITARIO) VALUES (?, ?, ?, ?)";

        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            for (ItemPedido item : itens) {
                stmt.setInt(1, idPedido);
                stmt.setInt(2, item.idProduto());
                stmt.setDouble(3, item.quantidade());
                stmt.setDouble(4, item.valorUnitario());
                stmt.addBatch();
            }
            stmt.executeBatch();
        }
    }
}