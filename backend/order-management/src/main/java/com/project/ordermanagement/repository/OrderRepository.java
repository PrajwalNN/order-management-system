package com.project.ordermanagement.repository;

import com.project.ordermanagement.entity.Order;
import com.project.ordermanagement.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUser(UserEntity user);

    List<Order> findByStatus(String status);

    long countByStatus(String status);
}