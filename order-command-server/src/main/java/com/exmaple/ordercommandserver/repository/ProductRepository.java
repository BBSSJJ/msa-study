package com.exmaple.ordercommandserver.repository;

import com.exmaple.ordercommandserver.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
