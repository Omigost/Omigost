package com.omigost.server.repository;

import com.omigost.server.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findUsersByName(String name);
    void deleteUserByName(String name);
}
