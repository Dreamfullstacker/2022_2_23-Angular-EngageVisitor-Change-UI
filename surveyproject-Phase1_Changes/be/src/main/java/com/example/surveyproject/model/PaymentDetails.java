package com.example.surveyproject.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.net.URLDecoder;
import java.sql.Timestamp;


@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
public class PaymentDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    String user_id;
    String subscription_id;
    String status;
    String email;
    String marketing_consent;
    String cancel_url;
    String update_url;
    String subscription_plan_id;
    String next_bill_date;
    String passthrough;
    String currency;
    String checkout_id;
    String source;
    String linked_subscriptions;
    String unit_price;
    String alert_id;
    @JsonProperty("alert_name")
    String alertName;
    String event_time;

    @CreationTimestamp
    @Column(name = "created_date")
    private Timestamp createdDate;

    @UpdateTimestamp
    @Column(name = "updated_date")
    private Timestamp updatedDate;

    public Long getId() {
        return id;
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public String getSubscription_id() {
        return subscription_id;
    }

    public void setSubscription_id(String subscription_id) {
        this.subscription_id = subscription_id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = URLDecoder.decode(status);
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = URLDecoder.decode(email);
    }

    public String getMarketing_consent() {
        return marketing_consent;
    }

    public void setMarketing_consent(String marketing_consent) {
        this.marketing_consent = URLDecoder.decode(marketing_consent);
    }

    public String getCancel_url() {
        return cancel_url;
    }

    public void setCancel_url(String cancel_url) {
        this.cancel_url = URLDecoder.decode(cancel_url);
    }

    public String getUpdate_url() {
        return update_url;
    }

    public void setUpdate_url(String update_url) {
        this.update_url = URLDecoder.decode(update_url);
    }

    public String getSubscription_plan_id() {
        return subscription_plan_id;
    }

    public void setSubscription_plan_id(String subscription_plan_id) {
        this.subscription_plan_id = URLDecoder.decode(subscription_plan_id);
    }

    public String getNext_bill_date() {
        return next_bill_date;
    }

    public void setNext_bill_date(String next_bill_date) {
        this.next_bill_date = URLDecoder.decode(next_bill_date);
    }

    public String getPassthrough() {
        return passthrough;
    }

    public void setPassthrough(String passthrough) {
        this.passthrough = URLDecoder.decode(passthrough);
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = URLDecoder.decode(currency);
    }

    public String getCheckout_id() {
        return checkout_id;
    }

    public void setCheckout_id(String checkout_id) {
        this.checkout_id = URLDecoder.decode(checkout_id);
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = URLDecoder.decode(source);
    }

    public String getLinked_subscriptions() {
        return linked_subscriptions;
    }

    public void setLinked_subscriptions(String linked_subscriptions) {
        this.linked_subscriptions = URLDecoder.decode(linked_subscriptions);
    }

    public String getUnit_price() {
        return unit_price;
    }

    public void setUnit_price(String unit_price) {
        this.unit_price = URLDecoder.decode(unit_price);
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Timestamp getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Timestamp createdDate) {
        this.createdDate = createdDate;
    }

    public Timestamp getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(Timestamp updatedDate) {
        this.updatedDate = updatedDate;
    }

    public String getAlert_id() {
        return alert_id;
    }

    public void setAlert_id(String alert_id) {
        this.alert_id = alert_id;
    }

    public String getAlertName() {
        return alertName;
    }

    public void setAlertName(String alertName) {
        this.alertName = alertName;
    }

    public String getEvent_time() {
        return event_time;
    }

    public void setEvent_time(String event_time) {
        this.event_time = URLDecoder.decode(event_time);
    }
}
