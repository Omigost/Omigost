package com.omigost.server.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity(name = "company_user")
@EqualsAndHashCode
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @NotNull
    String name;

    @EqualsAndHashCode.Exclude
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    Set<Communication> communications = new HashSet<>();

    @EqualsAndHashCode.Exclude
    @ManyToMany(mappedBy = "users")
    Set<Account> accounts = new HashSet<>();
    
    public User() {}

    public User(String name) {
        this.name = name;
    }
}
