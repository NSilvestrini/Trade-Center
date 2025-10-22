
import com.sun.net.httpserver.HttpServer;
import br.com.fiap.tradecenter.controller.EstoqueHandler;
import br.com.fiap.tradecenter.controller.PedidoHandler;
import br.com.fiap.tradecenter.controller.ProdutoHandler;

import java.net.InetSocketAddress;

public class Main {
    public static void main(String[] args) throws Exception {
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
        server.createContext("/estoque", new EstoqueHandler());
        server.createContext("/pedidos", new PedidoHandler());
        server.createContext("/produtos", new ProdutoHandler());

        server.start();
        System.out.println("Servidor rodando em http://localhost:8080");

    }
}