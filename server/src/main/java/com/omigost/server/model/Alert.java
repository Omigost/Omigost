package com.omigost.server.model;

import lombok.*;

import javax.persistence.*;

@Data
@Entity
@EqualsAndHashCode
public class Alert {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;

    @ManyToOne
    @JoinColumn(name="communication", referencedColumnName="id") // TODO do we really need these duplications for something?
    public Communication communication;

    @ManyToOne // TODO consider multiple tokens per alert (ie. expiring and reissuing tokens)
    @JoinColumn(name="alert_response_token", referencedColumnName="id")
    public AlertResponseToken token;
}
