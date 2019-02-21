package com.omigost.server.repository;

import com.omigost.server.model.AlertResponseToken;

import java.util.Optional;

public interface AlertResponseTokenRepository extends BaseRepository<AlertResponseToken> {
    Optional<AlertResponseToken> findAlertResponseTokenBy(String token);
}
