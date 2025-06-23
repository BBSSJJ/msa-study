package com.exmaple.orderqueryserver.repository;

import com.exmaple.orderqueryserver.entity.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderQueryRepository extends MongoRepository<Order, String> {
}
