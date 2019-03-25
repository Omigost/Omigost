package com.omigost.server.notification;

import org.junit.Rule;
import org.junit.Test;

import com.amazonaws.services.s3.*;
import org.testcontainers.containers.localstack.LocalStackContainer;
import static org.testcontainers.containers.localstack.LocalStackContainer.Service.S3;

public class NotificationMessageTest {

    @Rule
    public LocalStackContainer localstack = new LocalStackContainer()
            .withServices(S3);

    @Test
    public void someTestMethod() {
        AmazonS3 s3 = AmazonS3ClientBuilder
                .standard()
                .withEndpointConfiguration(localstack.getEndpointConfiguration(S3))
                .withCredentials(localstack.getDefaultCredentialsProvider())
                .build();

        s3.createBucket("foo");
        s3.putObject("foo", "bar", "baz");
    }
}

/*
package com.omigost.server.notification;

import org.junit.Test;

import com.amazonaws.services.sqs.AmazonSQS;
import com.amazonaws.services.sqs.AmazonSQSClient;
import org.testcontainers.containers.localstack.LocalStackContainer;
import org.junit.ClassRule;
import org.junit.Before;
import static org.testcontainers.containers.localstack.LocalStackContainer.Service.SQS;

class NotificationMessageTest {

    @ClassRule
    private LocalStackContainer localstack;

    @ClassRule
    private AmazonSQS sqs;

    @Before
    public void setup() throws Exception {
        localstack = new LocalStackContainer().withServices(SQS);
        
        sqs = AmazonSQSClient.builder()
            .withEndpointConfiguration(localstack.getEndpointConfiguration(SQS))
            .build();
    }
            
    @Test
    public void lolXD() {
        sqs.listQueues();
    }

}
*/
