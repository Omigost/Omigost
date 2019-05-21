package com.omigost.server.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Data
@Entity
@EqualsAndHashCode
public class ApplicationSettings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    public ApplicationSettings() {
    }

    public ApplicationSettings(@NotNull String encryptionToken) {
        this.encryptionToken = encryptionToken;
    }

    @NotNull
    String encryptionToken;
}
