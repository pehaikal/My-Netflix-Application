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

import fr.epita.apimodel.UserRegisterRequest;
import fr.epita.apimodel.UserRegisterResponse;
import fr.epita.config.ErrorConstants;
import fr.epita.dao.UserRegisterDAO;

public class UserResgisterServices {

	public static byte[] registerUser(HttpExchange exchange, DriverManagerDataSource ds)
			throws JsonProcessingException {

		UserRegisterResponse response = new UserRegisterResponse(ErrorConstants.INVALID_REQUEST[0],
				ErrorConstants.INVALID_REQUEST[1]);

		URI requestURI = exchange.getRequestURI();
		String requestMethod = exchange.getRequestMethod();

		System.out.println("Received request [" + requestMethod + "]from : " + requestURI);

		InputStream inputRequets = exchange.getRequestBody();

		ObjectMapper mapper = new ObjectMapper();
		String requestBody = new BufferedReader(new InputStreamReader(inputRequets)).lines()
				.collect(Collectors.joining("\n"));

		System.out.println(requestBody);
		UserRegisterRequest userRegister = null;

		try {
			userRegister = mapper.readValue(requestBody, UserRegisterRequest.class);

			System.out.println(userRegister);

			switch (requestMethod) {

			case "POST":
				System.out.println("register user started");
				UserRegisterDAO dao = new UserRegisterDAO(ds);

				int userExist = dao.checkUserExist(userRegister);
				// 1- check if user exist
				if (userExist > 0) {
					response = new UserRegisterResponse(ErrorConstants.USER_EXIST[0], ErrorConstants.USER_EXIST[1]);
				} else {
					// 2- store user in contact table and get contact_id
					long contactId = dao.insertContact(userRegister);
					if (contactId == -1) {
						response = new UserRegisterResponse(ErrorConstants.CONTACT_ADD_FAILED[0],
								ErrorConstants.CONTACT_ADD_FAILED[1]);
						System.out.println("Failed to add user");
					} else {
						// 3- store password in login table
						dao.insertLogin(contactId, userRegister.getUserPassword());
						response = new UserRegisterResponse(ErrorConstants.SUCCESS[0], ErrorConstants.SUCCESS[1]);
						System.out.println("User added successfully");
					}
				}

				System.out.println("register user ended");
				break;

			default:
				System.out.println("not implemented");
				response = new UserRegisterResponse(ErrorConstants.INVALID_METHOD_POST[0],
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
