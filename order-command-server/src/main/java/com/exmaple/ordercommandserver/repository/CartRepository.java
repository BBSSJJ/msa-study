package com.exmaple.ordercommandserver.repository;

import com.exmaple.ordercommandserver.entity.CartItem;
import com.exmaple.ordercommandserver.entity.Product;
import com.exmaple.ordercommandserver.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CartRepository extends JpaRepository<CartItem, Long> {
    CartItem findByUserAndProduct(User user, Product product);

    @Query("SELECT ci FROM CartItem ci JOIN FETCH ci.product WHERE ci.user = :user")
    List<CartItem> findAllByUser(User user);
}
