package fr.epita.services;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.stream.Collectors;

import org.springframework.jdbc.datasource.DriverManagerDataSource;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.net.httpserver.HttpExchange;

import fr.epita.apimodel.UserLoginRequest;
import fr.epita.apimodel.UserLoginResponse;
import fr.epita.config.ErrorConstants;
import fr.epita.dao.UserLoginDAO;

public class UserLoginServices {

	public static byte[] validateUserLogin(HttpExchange exchange, DriverManagerDataSource ds)
			throws JsonProcessingException {

		UserLoginResponse response = new UserLoginResponse(ErrorConstants.INVALID_REQUEST[0],
				ErrorConstants.INVALID_REQUEST[1]);

		URI requestURI = exchange.getRequestURI();
		String requestMethod = exchange.getRequestMethod();

		System.out.println("Received request [" + requestMethod + "]from : " + requestURI);

		InputStream inputRequets = exchange.getRequestBody();

		ObjectMapper mapper = new ObjectMapper();
		String requestBody = new BufferedReader(new InputStreamReader(inputRequets)).lines()
				.collect(Collectors.joining("\n"));

		System.out.println(requestBody);
		UserLoginRequest userLogin = null;

		try {
			userLogin = mapper.readValue(requestBody, UserLoginRequest.class);

			System.out.println(userLogin);

			switch (requestMethod) {

			case "POST":
				// connect to database and check if user / password match
				System.out.println("into post to check password");
				System.out.println("user : " + userLogin.getUserName());
				System.out.println("password : " + userLogin.getUserPassword());

				// connect to db and validate user/password
				UserLoginDAO dao = new UserLoginDAO(ds);
				int userExist = dao.validateUser(userLogin);

				if (userExist > 0) {
					response = new UserLoginResponse(ErrorConstants.SUCCESS[0], ErrorConstants.SUCCESS[1]);
				} else {
					response = new UserLoginResponse(ErrorConstants.INVALID_USER_PASSWORD[0],
							ErrorConstants.INVALID_USER_PASSWORD[1]);
				}
				break;

			default:
				System.out.println("not implemented");
				response = new UserLoginResponse(ErrorConstants.INVALID_METHOD_POST[0],
						ErrorConstants.INVALID_METHOD_POST[1]);
				break;
			}

		} catch (Exception e) {
			System.out.println("Error" + e.getMessage());
			e.printStackTrace();
		}

		return mapper.writeValueAsString(response).getBytes(StandardCharsets.UTF_8);

	}

}
