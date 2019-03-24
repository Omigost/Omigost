package com.omigost.server.aws.termination;

import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.services.elasticbeanstalk.AWSElasticBeanstalk;
import com.amazonaws.services.elasticbeanstalk.AWSElasticBeanstalkClientBuilder;
import com.amazonaws.services.elasticbeanstalk.model.TerminateEnvironmentRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.List;

@Service
public class EBSTerminationService {
    @Value("${aws.region}")
    private String region;

    private AWSElasticBeanstalk awsElasticBeanstalk;

    @Autowired
    private AWSCredentialsProvider awsCredentials;

    @PostConstruct
    private void init() {
        awsElasticBeanstalk = AWSElasticBeanstalkClientBuilder.standard()
                .withRegion(region)
                .withCredentials(awsCredentials)
                .build();
    }

    private TerminateEnvironmentRequest ebsTerminationRequest(String envId) {
        return new TerminateEnvironmentRequest()
                .withEnvironmentId(envId)
                .withForceTerminate(true)
                .withTerminateResources(true);
    }

    public void stop(String envId) {
        awsElasticBeanstalk.terminateEnvironment(ebsTerminationRequest(envId));
    }

    public void stop(List<String> envIds) {
        envIds.forEach(this::stop);
    }


}
