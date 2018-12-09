package com.omigost.server.model;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class AwsAccount {
    AwsAccount manager;
    String awsPath;
    String awsUserName;
    String awsUserId;
    String arn;
    List<Tag> tags;
    String slackToken;
}
