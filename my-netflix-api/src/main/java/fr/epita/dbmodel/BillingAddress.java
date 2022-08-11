package fr.epita.dbmodel;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "billing_address")
public class BillingAddress {

    @Id
    @GenericGenerator(name = "billing_address_id", strategy = "increment")
    private Integer billingAddressId;

    @Column(name = "contact_id")
    private Integer contactId;

    @Column(name = "country")
    private String country;

    @Column(name = "area")
    private String area;

    @Column(name = "street")
    private String street;

    @Column(name = "street_number")
    private Integer streetNumber;

    public BillingAddress(Integer billingAddressId, Integer contactId, String country, String area, String street, Integer streetNumber) {
        this.billingAddressId = billingAddressId;
        this.contactId = contactId;
        this.country = country;
        this.area = area;
        this.street = street;
        this.streetNumber = streetNumber;
    }

    public BillingAddress() {
    }

    public Integer getBillingAddressId() {
        return billingAddressId;
    }

    public void setBillingAddressId(Integer billingAddressId) {
        this.billingAddressId = billingAddressId;
    }

    public Integer getContactId() {
        return contactId;
    }

    public void setContactId(Integer contactId) {
        this.contactId = contactId;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
    	this.country = country;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
    	this.area = area;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
    	this.street = street;
    }

    public Integer getStreetNumber() {
        return streetNumber;
    }

    public void setStreetNumber(Integer streetNumber) {
        this.streetNumber = streetNumber;
    }

    @Override
    public String toString() {
        return "BillingAddress{" +
                "billingAddressId=" + billingAddressId +
                ", contactId=" + contactId +
                ", country='" + country + '\'' +
                ", area='" + area + '\'' +
                ", street='" + street + '\'' +
                ", streetNumber=" + streetNumber +
                '}' + '\n';
    }
}