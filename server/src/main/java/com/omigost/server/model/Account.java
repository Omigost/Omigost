package com.omigost.server.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    Integer id;

    @NotNull
    public String awsId;

    @NotNull
    String name;

    @ManyToMany
    @JsonIgnore
    @JoinTable(name = "account_user",
            joinColumns = @JoinColumn(name = "account_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "company_user_id", referencedColumnName = "id"))
    Set<User> users = new HashSet<>();
}
