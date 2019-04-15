package com.omigost.server.scheduledTermination;

import com.omigost.server.ServerApplication;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest(classes = ServerApplication.class)
@RunWith(SpringRunner.class)
@TestPropertySource("classpath:test.properties")
public class TestTemplate {

}