package com.exmaple.ordercommandserver.repository;

import com.exmaple.ordercommandserver.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderQueryRepository extends JpaRepository<Order, String> {
    @Query("SELECT DISTINCT o FROM Order o " +
            "JOIN FETCH o.user " +
            "LEFT JOIN FETCH o.items")
    List<Order> findAll();
}
