package br.com.fiap.tradecenter.controller;

import br.com.fiap.tradecenter.models.ItemPedido;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import br.com.fiap.tradecenter.dao.PedidoDAO;
import br.com.fiap.tradecenter.models.Pedido;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.ArrayList;
import java.util.List;

public class PedidoHandler implements HttpHandler {

    // ... restante da classe e métodos auxiliares (readBody, sendResponse) ...

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        // ... Configuração CORS e OPTIONS ...

        String method = exchange.getRequestMethod();
        String response;

        try {
            switch (method) {
                // ... GET ...
                case "GET":
                // Exemplo: resposta fixa
                response = "{\"message\":\"Lista de pedidos retornada com sucesso\"}";
                sendResponse(exchange, 200, response);
                break;

                case "POST": {
                    // 1. Lê o corpo completo da requisição
                    String body = readBody(exchange);

                    // 2. PARSING MANUAL DOS CAMPOS DO PEDIDO (Novo!)
                    double valorTotal = getJsonDouble(body, "valorTotal");
                    List<ItemPedido> itens = parseItensList(body); // Chamada da nova função!

                    // Validação básica
                    if (itens.isEmpty()) {
                        throw new IllegalArgumentException("O pedido deve conter pelo menos um item.");
                    }

                    // 3. Prepara os objetos
                    Pedido pedido = new Pedido(valorTotal);

                    try (Connection conn = DriverManager.getConnection(
                            "jdbc:oracle:thin:@oracle.fiap.com.br:1521:orcl",
                            "RM554415",
                            "261204"
                    )) {
                        // 4. Executa a transação completa no DAO
                        PedidoDAO dao = new PedidoDAO(conn);
                        // Chama o método que faz a inserção do Header e dos Itens
                        dao.criarPedidoCompleto(pedido, itens);
                    }

                    response = "{\"message\":\"Pedido criado com sucesso\"}";
                    sendResponse(exchange, 200, response);
                    break;
                }

                default: {
                    // ... Método não suportado ...
                }
            }
        } catch (IllegalArgumentException e) {
            response = "{\"error\":\"Erro de requisição: " + e.getMessage() + "\"}";
            sendResponse(exchange, 400, response);
        } catch (Exception e) {
            e.printStackTrace();
            // A exceção ORA-12505 ou outras falhas do DAO virão aqui
            response = "{\"error\":\"Erro interno: " + e.getMessage() + "\"}";
            sendResponse(exchange, 500, response);
        }
    }

    // --- Nova Função Auxiliar (Parsing do Array de Itens) ---

    /**
     * Faz o parsing manual do array de itens do pedido no corpo JSON.
     * Esta função é MUITO FRÁGIL e assume uma formatação JSON específica.
     */
    private List<ItemPedido> parseItensList(String json) {
        List<ItemPedido> itens = new ArrayList<>();
        String itensPattern = "\"itens\":";

        // 1. Localiza o início do array de itens
        int startArray = json.indexOf(itensPattern);
        if (startArray == -1) return itens;

        // O array começa após "itens": [
        startArray = json.indexOf("[", startArray) + 1;
        int endArray = json.indexOf("]", startArray);
        if (endArray == -1) return itens;

        // Substring que contém apenas os objetos do array: {"idProduto":1, ...}, {"idProduto":5, ...}
        String arrayContent = json.substring(startArray, endArray).trim();

        // 2. Divide em objetos individuais
        // Usamos um regex complexo para dividir por "}," mantendo a estrutura.
        String[] itemObjects = arrayContent.split("},\\s*");

        for (String itemJson : itemObjects) {
            // Se for o último objeto, precisamos adicionar o '}' que o split removeu
            if (!itemJson.endsWith("}")) {
                itemJson += "}";
            }

            // 3. Extrai os campos de cada objeto item
            try {
                int idProduto = getJsonInt(itemJson, "idProduto");
                int quantidade = getJsonInt(itemJson, "quantidade");
                double valorUnitario = getJsonDouble(itemJson, "valorUnitario");

                itens.add(new ItemPedido(idProduto, quantidade, valorUnitario));
            } catch (Exception e) {
                // Ignora ou lança erro se um item estiver mal formatado
                System.err.println("Erro ao parsear um ItemPedido: " + e.getMessage());
            }
        }
        return itens;
    }


    // --- Utilitários puros (ajustados para serem mais robustos) ---

    // Extrai um int de um JSON (melhorado)
    private int getJsonInt(String json, String key) {
        String pattern = "\"" + key + "\":";
        int start = json.indexOf(pattern);
        if (start == -1) return 0;
        start += pattern.length();
        int end = json.indexOf(",", start);
        if (end == -1) end = json.indexOf("}", start);
        if (end == -1) return 0; // Não achou nem vírgula, nem chave de fechamento
        try {
            return Integer.parseInt(json.substring(start, end).trim());
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Valor inválido para " + key);
        }
    }

    // Extrai um double de um JSON (melhorado)
    private double getJsonDouble(String json, String key) {
        String pattern = "\"" + key + "\":";
        int start = json.indexOf(pattern);
        if (start == -1) return 0.0;
        start += pattern.length();
        int end = json.indexOf(",", start);
        if (end == -1) end = json.indexOf("}", start);
        if (end == -1) return 0.0; // Não achou nem vírgula, nem chave de fechamento
        try {
            return Double.parseDouble(json.substring(start, end).trim());
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Valor inválido para " + key);
        }
    }


    // ... os métodos readBody e sendResponse
    /**
     * Lê o corpo completo da requisição HTTP (JSON).
     */
    private String readBody(HttpExchange exchange) throws IOException {
        InputStream input = exchange.getRequestBody();
        // Garante a leitura do corpo inteiro
        return new String(input.readAllBytes(), StandardCharsets.UTF_8);
    }

    /**
     * Envia a resposta HTTP com o código de status e o corpo JSON.
     */
    private void sendResponse(HttpExchange exchange, int statusCode, String response) throws IOException {
        byte[] bytes = response.getBytes(StandardCharsets.UTF_8);
        exchange.getResponseHeaders().add("Content-Type", "application/json; charset=UTF-8");
        exchange.sendResponseHeaders(statusCode, bytes.length);
        try (OutputStream os = exchange.getResponseBody()) {
            os.write(bytes);
        }
    }


}