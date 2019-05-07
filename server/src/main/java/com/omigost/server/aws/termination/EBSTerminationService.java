package com.omigost.server.aws.termination;

import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.services.elasticbeanstalk.AWSElasticBeanstalk;
import com.amazonaws.services.elasticbeanstalk.AWSElasticBeanstalkAsyncClientBuilder;
import com.amazonaws.services.elasticbeanstalk.model.TerminateEnvironmentRequest;
import com.omigost.server.aws.AWSRoleBasedCredentialProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EBSTerminationService {
    @Value("${aws.region}")
    private String region;
    @Autowired
    AWSRoleBasedCredentialProvider roleBasedCredentialProvider;

    private TerminateEnvironmentRequest ebsTerminationRequest(String envId) {
        return new TerminateEnvironmentRequest()
                .withEnvironmentId(envId)
                .withForceTerminate(true)
                .withTerminateResources(true);
    }

    private AWSElasticBeanstalk getAWSBeanStalKClient(String userId) {
        AWSCredentialsProvider userRoleProvider = roleBasedCredentialProvider.getCredentialsForUser(userId);
        return AWSElasticBeanstalkAsyncClientBuilder
                .standard()
                .withCredentials(userRoleProvider)
                .withRegion(region)
                .build();
    }

    public void stop(String envId, String userId) {
        getAWSBeanStalKClient(userId).terminateEnvironment(ebsTerminationRequest(envId));
    }

    public void stop(List<String> envIds, String userId) {
        if (envIds.isEmpty()) return;
        envIds.forEach(envId -> stop(envId, userId));
    }


}
