package com.omigost.server;

import com.omigost.server.config.AWSLocalstackConfig;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

@ActiveProfiles("dev")
@RunWith(SpringRunner.class)
@SpringBootTest
@ContextConfiguration(initializers = {AWSLocalstackConfig.Initializer.class})
@TestPropertySource("classpath:test.properties")
public class DevConfigTestTemplate {
}
