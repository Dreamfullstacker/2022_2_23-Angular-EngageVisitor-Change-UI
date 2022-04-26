package com.example.surveyproject.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.surveyproject.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	public User findByEmail(String emailId);

	public User findByEmailAndStatus(String email, String status);

	public User findByIdAndStatus(Long id, String status);

	public List<User> findByStatusOrderByCreatedDateDesc(String status);

}
