package br.com.fiap.tradecenter.controller;

import br.com.fiap.tradecenter.config.OracleConnection;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import br.com.fiap.tradecenter.dao.ProdutoDAO;
import br.com.fiap.tradecenter.models.Produto;

import java.io.IOException;
import java.io.OutputStream;
import java.sql.Connection;
import java.util.List;

public class ProdutoHandler implements HttpHandler {


    @Override
    public void handle(HttpExchange exchange) throws IOException {
        exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().add("Content-Type", "application/json");

        if (!exchange.getRequestMethod().equalsIgnoreCase("GET")) {
            exchange.sendResponseHeaders(405, 0);
            return;
        }

        try (Connection conn = OracleConnection.getConnection()) {
            ProdutoDAO dao = new ProdutoDAO(conn);
            List<Produto> produtos = dao.listarProdutos();

            // Monta JSON manualmente
            StringBuilder json = new StringBuilder();
            json.append("[");
            for (int i = 0; i < produtos.size(); i++) {
                Produto p = produtos.get(i);
                json.append("{")
                        .append("\"id\":").append(p.idProduto()).append(",")
                        .append("\"nome\":\"").append(escape(p.nome())).append("\",")
                        .append("\"descricao\":\"").append(escape(p.descricao())).append("\",")
                        .append("\"valor\":").append(p.valor())
                        .append("}");
                if (i < produtos.size() - 1) json.append(",");
            }
            json.append("]");

            byte[] responseBytes = json.toString().getBytes();
            exchange.sendResponseHeaders(200, responseBytes.length);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(responseBytes);
            }

        } catch (Exception e) {
            String error = "{\"error\":\"" + escape(e.getMessage()) + "\"}";
            exchange.sendResponseHeaders(500, error.getBytes().length);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(error.getBytes());
            }
        }
    }

    // Escapa aspas e barras para JSON válido
    private String escape(String text) {
        if (text == null) return "";
        return text.replace("\\", "\\\\").replace("\"", "\\\"");
    }
}
