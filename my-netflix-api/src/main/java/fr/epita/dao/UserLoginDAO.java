package fr.epita.dao;

import fr.epita.apimodel.UserLoginRequest;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class UserLoginDAO {

    DataSource ds;

    public UserLoginDAO(DataSource ds){
        this.ds = ds;
    }

    public int validateUser(UserLoginRequest userLogin) throws SQLException {
        Connection connection = ds.getConnection();
        PreparedStatement preparedStatement = connection.prepareStatement("select count(*) as cnt from contact c inner join login l on c.contact_id = l.contact_id where lower(c.email_address) = lower(?) and lower(l.login_password) = lower(?)");

        preparedStatement.setString(1, userLogin.getUserName());
        preparedStatement.setString(2, userLogin.getUserPassword().toLowerCase());

        ResultSet resultSet = preparedStatement.executeQuery();

        int count = 0;
        while (resultSet.next()) {
            count = resultSet.getInt("cnt");
        }

        return count;
    }
}
