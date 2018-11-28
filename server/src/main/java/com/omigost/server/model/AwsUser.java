package com.omigost.server.model;

import lombok.Builder;
import lombok.Data;

import java.util.List;

//better nameing
@Data
@Builder
public class AwsUser {
    AwsUser manager;
    String awsPath;
    String awsUserName;
    String awsUserId;
    String arn; //amazon resource name
    List<Tag> tags;
    String slackToken;
}
