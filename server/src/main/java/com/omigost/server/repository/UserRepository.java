package com.omigost.server.repository;

import com.omigost.server.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {
    User getUserByName(String name);

    List<User> getUsersByName(String name);

    void deleteUserByName(String name);
}
