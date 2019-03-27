package com.omigost.server.rest.dto;

import lombok.Data;
import org.springframework.util.MultiValueMap;

import java.util.List;
import java.util.Map;

@Data
public class BudgetCreateRequest {
    int limit;
    List<String> linkedAccounts;
    Map<String, List<String>> tags;
}
