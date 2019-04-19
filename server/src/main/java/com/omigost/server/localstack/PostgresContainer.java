package com.omigost.server.localstack;

import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MapPropertySource;
import org.springframework.core.env.StandardEnvironment;
import org.testcontainers.containers.PostgreSQLContainer;

import java.util.HashMap;
import java.util.Map;

public class PostgresContainer implements ImageContainer {

    private PostgreSQLContainer container;

    public PostgresContainer(final String imageName) {
        container = new PostgreSQLContainer(imageName);
    }

    public void launch() {
        if (!container.isRunning()) {
            container.start();
        }
    }

    public void initialize(ConfigurableApplicationContext configurableApplicationContext) {
        launch();

        ConfigurableEnvironment environment = new StandardEnvironment();
        Map<String, Object> overrideConfig = new HashMap<String, Object>() {{
            put("spring.datasource.url", container.getJdbcUrl());
            put("spring.datasource.username", container.getUsername());
            put("spring.datasource.password", container.getPassword());
        }};

        ConfigurableEnvironment env = configurableApplicationContext.getEnvironment();
        env.getPropertySources().addFirst(new MapPropertySource(this.getClass().getCanonicalName(), overrideConfig));
        configurableApplicationContext.setEnvironment(env);
    }

}