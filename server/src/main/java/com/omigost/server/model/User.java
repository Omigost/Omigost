package com.omigost.server.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity(name = "aws_user")
@EqualsAndHashCode
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;

    @NotNull
    public String name;

    @EqualsAndHashCode.Exclude
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "user_communication",
            joinColumns = @JoinColumn(name = "aws_user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "communication_id", referencedColumnName = "id"))
    public Set<Communication> communications = new HashSet<>();

    @EqualsAndHashCode.Exclude
    @ManyToMany(mappedBy = "users")
    public Set<Account> accounts = new HashSet<>();
}
