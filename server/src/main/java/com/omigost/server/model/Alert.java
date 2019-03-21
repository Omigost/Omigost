package com.omigost.server.model;

import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

@Data
@Entity
@Builder
@EqualsAndHashCode
public class Alert {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;

    @ManyToOne
    @JoinColumn(name="communication", referencedColumnName="id")
    public Communication communication;

    @ManyToOne
    @JoinColumn(name="alert_response_token", referencedColumnName="id")
    public AlertResponseToken token;
}
