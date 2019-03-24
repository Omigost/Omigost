package com.omigost.server.repository;

import com.omigost.server.model.AlertResponseToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AlertResponseTokenRepository extends JpaRepository<AlertResponseToken, Integer> {
    Optional<AlertResponseToken> findAlertResponseTokenByToken(String token);
}
