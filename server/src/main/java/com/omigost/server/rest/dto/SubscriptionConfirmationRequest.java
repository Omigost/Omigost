package com.omigost.server.rest.dto;

import lombok.Data;

@Data
public class SubscriptionConfirmationRequest {
    String Type;
    String MessageId;
    String Token;
    String TopicArn;
    String Message;
    String SubscribeURL;
    String Timestamp;
    String SignatureVersion;
    String Signature;
    String SigningCertURL;
}
