package fr.epita.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.sql.DataSource;

import fr.epita.apimodel.RegisterUserRequest;

public class RegisterUserDAO {

	DataSource ds;

	public RegisterUserDAO(DataSource ds) {
		this.ds = ds;
	}

	public long insertContact(RegisterUserRequest registerUser) throws SQLException {

		try (Connection connection = ds.getConnection();
				PreparedStatement preparedStatement = connection.prepareStatement(
						"insert into contact (first_name, last_name, phone_number, email_address) values (?, ?, ?, ?)",
						Statement.RETURN_GENERATED_KEYS)) {

			preparedStatement.setString(1, registerUser.getFirstName());
			preparedStatement.setString(2, registerUser.getLastName());
			preparedStatement.setString(3, registerUser.getPhoneNumber());
			preparedStatement.setString(4, registerUser.getUserName());

			int affectedRows = preparedStatement.executeUpdate();

			if (affectedRows == 0) {
				System.out.println("Failed to insert contact, no rows affected");
				return -1;
			}

			try (ResultSet generatedKeys = preparedStatement.getGeneratedKeys()) {
				if (generatedKeys.next()) {
					return generatedKeys.getLong(1);
				} else {
					System.out.println("inserting contact failed, no contact_id returned");
					return -1;
				}
			}
		}

	}

	public void insertLogin(long contactId, String password) throws SQLException {
		Connection connection = ds.getConnection();
		PreparedStatement preparedStatement = connection
				.prepareStatement("insert into login(contact_id, login_password) values (?, ?)");

		preparedStatement.setLong(1, contactId);
		preparedStatement.setString(2, password);

		preparedStatement.execute();
	}

	public int checkUserExist(RegisterUserRequest registerUser) throws SQLException {
		Connection connection = ds.getConnection();
		PreparedStatement preparedStatement = connection
				.prepareStatement("select count(*) as cnt from contact where lower(email_address) = lower(?)");

		preparedStatement.setString(1, registerUser.getUserName());

		ResultSet resultSet = preparedStatement.executeQuery();

		int count = 0;
		while (resultSet.next()) {
			count = resultSet.getInt("cnt");
		}

		return count;
	}
}