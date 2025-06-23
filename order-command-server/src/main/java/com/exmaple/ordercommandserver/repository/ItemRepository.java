package com.exmaple.ordercommandserver.repository;

import com.exmaple.ordercommandserver.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {
}
