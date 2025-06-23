package com.exmaple.ordercommandserver.repository;

import com.exmaple.ordercommandserver.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderCommandRepository extends JpaRepository<Order, String> {
}
