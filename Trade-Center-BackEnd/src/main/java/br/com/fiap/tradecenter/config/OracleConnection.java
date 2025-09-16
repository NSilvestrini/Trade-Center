package main.java.br.com.fiap.tradecenter.config;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class OracleConnection {

    private static final String url = "";
    private static final String user = "";
    private static final String pass = "";

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(url, user, pass);
    }

}
