package com.omigost.server.rest.dto;

import com.amazonaws.services.costexplorer.model.DateInterval;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class TagSpendingDTO {
    Map<String, List<String>> tags;
    DateInterval dateInterval;
}
