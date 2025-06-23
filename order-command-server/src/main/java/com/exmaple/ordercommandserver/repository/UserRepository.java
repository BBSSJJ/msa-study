package com.exmaple.ordercommandserver.repository;

import com.exmaple.ordercommandserver.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
