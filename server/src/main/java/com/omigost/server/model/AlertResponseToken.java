package com.omigost.server.model;

import com.omigost.server.repository.AlertResponseTokenRepository;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Random;

@Data
@Entity
@Component
@EqualsAndHashCode
public class AlertResponseToken {
    static final Integer TOKEN_LENGTH = 12;
    static final char[] TOKEN_CHARACTERS = ("abcdefghijklmnopqrstuvwxyz" + "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "0123456789").toCharArray();

    static final String ACTIVE_STATUS = "active";

    static Random random = new Random();

    @Autowired
    AlertResponseTokenRepository tokens;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;

    @NotNull
    @Column(unique = true)
    public String token;

    @NotNull
    String status;

    public Boolean isActive() {
        return ACTIVE_STATUS.equals(status);
    }

    public AlertResponseToken() {
        do {
            token = getRandomString();
        } while (tokens.findAlertResponseTokenBy(token).isPresent());
    }

    private String getRandomString() {
        StringBuilder randomString = new StringBuilder();
        for (int i = 0; i < TOKEN_LENGTH; ++i) {
            randomString.append(TOKEN_CHARACTERS[random.nextInt(TOKEN_CHARACTERS.length)]);
        }
        return randomString.toString();
    }
}
