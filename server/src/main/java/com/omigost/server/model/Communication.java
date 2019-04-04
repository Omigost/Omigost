package com.omigost.server.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.omigost.server.notification.NotificationService;
import com.omigost.server.notification.slack.SlackService;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Data
@Entity
public class Communication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @NotNull
    String name;

    @NotNull
    String value;

    @ManyToOne
    @JoinColumn
    @JsonIgnore
    @EqualsAndHashCode.Exclude
    User user;

    public Communication() {}

    public Communication(String name, String value) {
        this.name = name;
        this.value = value;
    }

    public NotificationService service() {
        switch (name) {
            case CommunicationType.SLACK:
                return new SlackService();
            default:
                throw new RuntimeException("Communication type not supported!");
        }
    }

    ;
}
