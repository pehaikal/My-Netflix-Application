package fr.epita.apimodel;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
        "userName",
        "userPassword"
})

public class UserLoginRequest {
    @JsonProperty("userName")
    String userName;

    @JsonProperty("userPassword")
    String userPassword;

    public UserLoginRequest() {

    }

    public UserLoginRequest(String userName, String userPassword) {
        this.userName = userName;
        this.userPassword = userPassword;
    }

    @JsonProperty("userName")
    public String getUserName() {
        return userName;
    }

    @JsonProperty("userName")
    public void setUserName(String userName) {
        this.userName = userName;
    }

    @JsonProperty("userPassword")
    public String getUserPassword() {
        return userPassword;
    }

    @JsonProperty("userPassword")
    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }
}
