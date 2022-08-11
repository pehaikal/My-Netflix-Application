package fr.epita.server;

import java.io.IOException;
import java.net.InetSocketAddress;

import org.springframework.jdbc.datasource.DriverManagerDataSource;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import fr.epita.config.Configuration;
import fr.epita.services.UserLoginServices;
import fr.epita.services.UserResgisterServices;

public class NetflixServer {

	static {
		System.setProperty("conf.file.path", "src/main/resources/conf.properties");
	}

	public static void main(String[] args) throws IOException {
		InetSocketAddress socketAddress = new InetSocketAddress("127.0.0.1", 8089);

		HttpServer server = HttpServer.create(socketAddress, 0);

		Configuration conf = Configuration.getInstance();
		DriverManagerDataSource ds = new DriverManagerDataSource(conf.getDBUrl(), conf.getDBUser(),
				conf.getDBPassword());

		// login service
		server.createContext("/java-api/login", new HttpHandler() {
			@Override
			public void handle(HttpExchange exchange) throws IOException {
				try {
					byte[] bytes = UserLoginServices.validateUserLogin(exchange, ds);

					exchange.getResponseHeaders().set("Content-type", "application/json");
					exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
					exchange.getResponseHeaders().set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
					exchange.getResponseHeaders().set("Access-Control-Allow-Headers", "Content-Type");
					exchange.getResponseHeaders().set("Access-Control-Allow-Credentials", "true");
					exchange.sendResponseHeaders(200, bytes.length);
					exchange.getResponseBody().write(bytes);
					exchange.close();

				} catch (Exception e) {
					System.out.println("Error" + e.getMessage());
					e.printStackTrace();
				}
			}
		});

		// register service
		server.createContext("/java-api/register", new HttpHandler() {
			@Override
			public void handle(HttpExchange exchange) throws IOException {
				try {
					byte[] bytes = UserResgisterServices.registerUser(exchange, ds);

					exchange.getResponseHeaders().set("Content-type", "application/json");
					exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
					exchange.getResponseHeaders().set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
					exchange.getResponseHeaders().set("Access-Control-Allow-Headers", "Content-Type");
					exchange.getResponseHeaders().set("Access-Control-Allow-Credentials", "true");
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
		
		System.out.println("Server is running and awaiting requests...");
	}
}
