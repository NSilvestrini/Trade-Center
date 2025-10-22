package br.com.fiap.tradecenter.controller;

import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;
import br.com.fiap.tradecenter.config.OracleConnection;
import br.com.fiap.tradecenter.dao.ProdutoDAO;

import java.io.IOException;
import java.io.OutputStream;
import java.sql.Connection;



public class EstoqueHandler implements HttpHandler {

    @Override
    public void handle(HttpExchange exchange) throws IOException {

        // Libera CORS (pra o React poder acessar)
        exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().add("Content-Type", "application/json");

        if (!exchange.getRequestMethod().equalsIgnoreCase("GET")) {
            exchange.sendResponseHeaders(404, 0);
            return;
        }

        try (Connection conn = OracleConnection.getConnection()) {
            ProdutoDAO dao = new ProdutoDAO(conn);
            int total = dao.contarProdutos();

            String response = String.format("{\"totalProdutos\": %d}", total);

            exchange.sendResponseHeaders(200, response.getBytes().length);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(response.getBytes());
            }
        } catch (Exception e) {
            String error = "{\"error\": \"" + e.getMessage() + "\"}";
            exchange.sendResponseHeaders(500, error.getBytes().length);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(error.getBytes());
            }
        }
    }
}
