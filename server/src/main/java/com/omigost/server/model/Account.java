package com.omigost.server.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.annotations.Fetch;

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
    String awsId;

    @NotNull
    String name;

    @NotNull
    boolean scheduledNotification = false;

    @ManyToMany
    @JsonIgnore
    @JoinTable(name = "account_user",
            joinColumns = @JoinColumn(name = "account_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "company_user_id", referencedColumnName = "id"))
    Set<User> users = new HashSet<>();
}
