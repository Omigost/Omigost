package com.omigost.server.model;

import com.omigost.server.repository.AlertResponseTokenRepository;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.UUID;

@Data
@Entity
@EqualsAndHashCode
public class AlertResponseToken {
    static final String ACTIVE_STATUS = "active";
    static final String USED_STATUS = "used";

    @Autowired
    @Transient
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
        this.token = UUID.randomUUID().toString();
    }

    public AlertResponseToken(String token, String status) {
        this.token = token;
        this.status = status;
    }

    public void invalidate() {
        status = USED_STATUS;
    }
}
