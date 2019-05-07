package com.omigost.server.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.omigost.server.notification.NotificationService;
import com.omigost.server.notification.slack.SlackService;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Data
@Entity
@EqualsAndHashCode
public class Communication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @NotNull
    String type;

    @NotNull
    String value;

    @ManyToOne
    @JoinColumn
    @JsonIgnore
    @EqualsAndHashCode.Exclude
    User user;

    public Communication() {}

    public Communication(String type, String value) {
        this.type = type;
        this.value = value;
    }

    public NotificationService service() {
        switch (type) {
            case CommunicationType.SLACK:
                return new SlackService();
            default:
                throw new RuntimeException("Communication type not supported!");
        }
    }

    ;
}
