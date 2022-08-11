package fr.epita.dbmodel;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "contact_role")
public class ContactRole {

    @Column(name = "contact_id")
    private Integer contactId;

    @Column(name = "role_name")
    private String roleName;

    public ContactRole(Integer contactId, String roleName) {
        this.contactId = contactId;
        this.roleName = roleName;
    }

    public Integer getContactId() {
        return contactId;
    }

    public void setContactId(Integer contactId) {
        this.contactId = contactId;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    @Override
    public String toString() {
        return "ContactRole{" +
                "contactId=" + contactId +
                ", roleName='" + roleName + '\'' +
                '}' + '\n';
    }
}
