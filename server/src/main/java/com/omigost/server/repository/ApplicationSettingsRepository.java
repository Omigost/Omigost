package com.omigost.server.repository;

import com.omigost.server.model.ApplicationSettings;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplicationSettingsRepository extends JpaRepository<ApplicationSettings, Integer> {
}
