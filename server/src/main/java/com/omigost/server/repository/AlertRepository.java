package com.omigost.server.repository;

import com.omigost.server.model.Alert;
import com.omigost.server.model.AlertResponseToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlertRepository extends JpaRepository<Alert, Integer> {
    Alert getAlertByToken(AlertResponseToken token); // TODO any alert will suffice?
}
