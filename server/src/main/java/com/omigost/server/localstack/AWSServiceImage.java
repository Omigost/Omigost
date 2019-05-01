package com.omigost.server.localstack;

import lombok.extern.slf4j.Slf4j;
import org.testcontainers.containers.GenericContainer;

@Slf4j
public class AWSServiceImage extends GenericContainer<AWSServiceImage> {

    public AWSServiceImage() {
        super();
    }

    public void configureImage() {
        this.configure();
    }
}