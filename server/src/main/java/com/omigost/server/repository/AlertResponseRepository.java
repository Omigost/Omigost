package com.omigost.server.repository;

import com.omigost.server.model.AlertResponse;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlertResponseRepository extends JpaRepository<AlertResponse, Integer> {
}
