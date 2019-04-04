package com.omigost.server.aws;


import java.util.List;

public interface MachineListingService {
    List<String> getRunningEC2Instances(String userId);
}
