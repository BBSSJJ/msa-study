package com.example.orderqueryserver.repository;

import com.example.orderqueryserver.entity.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderQueryRepository extends MongoRepository<Order, String> {
}
