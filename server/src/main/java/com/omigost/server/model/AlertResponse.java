package com.omigost.server.model;

import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

/* Constitutes a response to an Alert */
@Data
@Entity
@Builder
@EqualsAndHashCode
public class AlertResponse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    String body;

    @ManyToOne
    @JoinColumn
    Alert alert;
}
