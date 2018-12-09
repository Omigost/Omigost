package com.omigost.server.iam;

import com.omigost.server.model.AwsAccount;

import java.util.List;

public interface IAMService {
    List<AwsAccount> users();
}
