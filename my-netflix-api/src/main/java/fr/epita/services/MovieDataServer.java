package fr.epita.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import fr.epita.apimodel.UserLoginRequest;
import fr.epita.apimodel.UserLoginResponse;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.InetSocketAddress;
import java.net.URI;
import java.nio.charset.StandardCharsets;

import java.util.stream.Collectors;

public class MovieDataServer {

    static{
        System.setProperty("conf.file.path","src/main/resources/conf.properties");
    }

    public static void main(String[] args) throws IOException {
        InetSocketAddress socketAddress = new InetSocketAddress("127.0.0.1", 8089);

        HttpServer server = HttpServer.create(socketAddress, 0);

        Configuration conf = Configuration.getInstance();
        DriverManagerDataSource ds = new DriverManagerDataSource(conf.getDBUrl(), conf.getDBUser(), conf.getDBPassword());

        server.createContext("/login", new HttpHandler() {
            @Override
            public void handle(HttpExchange exchange) throws IOException {
                URI requestURI = exchange.getRequestURI();
                String requestMethod = exchange.getRequestMethod();
                System.out.println("check point 1");

                InputStream inputRequets = exchange.getRequestBody();
                System.out.println("check point 2");

                ObjectMapper mapper = new ObjectMapper();
                String requestBody = new BufferedReader(new InputStreamReader(inputRequets))
                        .lines().collect(Collectors.joining("\n"));

                System.out.println(requestBody);
                UserLoginRequest userLogin = null;

                try {
                    userLogin = mapper.readValue(requestBody, UserLoginRequest.class);

                    System.out.println(userLogin);
                    UserLoginResponse response  = new UserLoginResponse("9999", "request not processed");

                    switch (requestMethod) {

                        case "POST":
                            // connect to database and check if user / password match
                            System.out.println("into post to check password");
                            System.out.println("user : " + userLogin.getUserName());
                            System.out.println("password : " + userLogin.getUserPassword());

                            //connect to db and validate user/password
                            UserLoginDAO dao = new UserLoginDAO(ds);
                            int userExist = dao.validateUser(userLogin);

                            if (userExist > 0) {
                                response = new UserLoginResponse("0000", "success");
                            } else {
                                response = new UserLoginResponse("9998", "failed");
                            }
                            break;

                        default:
                            System.out.println("not implemented");
                            response = new UserLoginResponse("9997", "invalid method received");
                            break;
                    }
                    byte[] bytes = mapper.writeValueAsString(response).getBytes(StandardCharsets.UTF_8);
                    exchange.getResponseHeaders().set("Content-type", "application/json");
                    exchange.sendResponseHeaders(200, bytes.length);
                    exchange.getResponseBody().write(bytes);
                    exchange.close();

                } catch (Exception e) {
                    System.out.println("Error" + e.getMessage());
                    e.printStackTrace();
                }
            }
        });

        server.start();
    }
}
