package com.example.surveyproject.repository;

import com.example.surveyproject.model.CouponDetails;
import com.example.surveyproject.model.Form;
import com.example.surveyproject.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CouponDetailsRepository extends JpaRepository<CouponDetails, Long> {

	Optional<CouponDetails> findByCouponCodeAndIsUsedAndIsActive(String couponCode,boolean isUsed,boolean isActive);


}
