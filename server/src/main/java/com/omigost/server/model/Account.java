package com.omigost.server.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer Id;

    @NotNull
    public String name;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable
    public Set<User> owners = new HashSet<>();
}
