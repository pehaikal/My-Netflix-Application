package fr.epita.services;

import fr.epita.apimodel.RegisterUserRequest;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class RegisterUserDAO {

    DataSource ds;

    public RegisterUserDAO(DataSource ds){
        this.ds = ds;
    }

    public void insertUser(RegisterUserRequest registerUser) throws SQLException {
        Connection connection = ds.getConnection();
        PreparedStatement preparedStatement = connection.prepareStatement("insert into contact(username, login_passowrd, first_name, last_name, phone_number) values (?,?,?,?,?)");

        preparedStatement.setString(1, registerUser.getUserName());
        preparedStatement.setString(2, registerUser.getUserPassword());
        preparedStatement.setString(3, registerUser.getFirstName());
        preparedStatement.setString(4, registerUser.getLastName());
        preparedStatement.setString(5, registerUser.getPhoneNumber());
        preparedStatement.execute();
    }
}