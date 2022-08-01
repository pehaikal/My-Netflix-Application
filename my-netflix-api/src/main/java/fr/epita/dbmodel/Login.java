package fr.epita.dbmodel;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "login")
public class Login {

    @Column(name = "contact_id")
    private Integer contactId;

    @Column(name = "login_password")
    private String loginPassword;

    public Login(Integer contactId, String loginPassword) {
        this.contactId = contactId;
        this.loginPassword = loginPassword;
    }

    public Integer getContactId() {
        return contactId;
    }

    public void setContactId(Integer contactId) {
        this.contactId = contactId;
    }

    public String getLoginPassword() {
        return loginPassword;
    }

    public void setLoginPassword(String loginPassword) {
        this.loginPassword = loginPassword;
    }

    @Override
    public String toString() {
        return "Login{" +
                "ContactId=" + this.contactId +
                ", loginPassword='" + loginPassword + '\'' +
                '}' + '\n';
    }
}
