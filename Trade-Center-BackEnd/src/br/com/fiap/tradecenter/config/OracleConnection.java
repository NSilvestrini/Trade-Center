package br.com.fiap.tradecenter.config;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class OracleConnection {

    private static final String url = "jdbc:oracle:thin:@oracle.fiap.com.br:1521:orcl";
    private static final String user = "RM554415";
    private static final String pass = "261204";

    public static Connection getConnection() throws SQLException {
        try {
            //Carrega o drive necessario JDBC
            Class.forName("oracle.jdbc.driver.OracleDriver");
        } catch (ClassNotFoundException e) {
            throw new SQLException("Driver not found");
        }

        return DriverManager.getConnection(url, user, pass);
    }

}
