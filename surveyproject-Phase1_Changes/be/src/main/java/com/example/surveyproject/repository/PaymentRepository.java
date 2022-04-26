package com.example.surveyproject.repository;

import com.example.surveyproject.model.PaymentDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<PaymentDetails, Long> {

    public List<PaymentDetails> findByEmailAndAlertNameOrderByIdDesc(String emailId,String alertName);

}
