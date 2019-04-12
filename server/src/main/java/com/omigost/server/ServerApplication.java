package com.omigost.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import com.omigost.server.config.AWSLocalstackConfig;

@SpringBootApplication
@EnableJpaAuditing
@EnableJpaRepositories(basePackages = {"com.omigost.server.repository"})
public class ServerApplication {
    public static void main(String[] args) {
        SpringApplication application = new SpringApplication(ServerApplication.class);
        application.addInitializers(new AWSLocalstackConfig.Initializer());
        application.run(args);
    }
}
