package com.omigost.server.rest.dto;

import com.amazonaws.services.costexplorer.model.DateInterval;
import lombok.Data;

import java.util.List;
import java.util.Map;

/**
 * Example
 *{
 * 	"tags" : {
 * 		"billable" :["true"]
 *        },
 * 	"dateInterval": {
 * 		"start": "2018-12-10",
 * 		"end": "2019-01-12"
 *    }
 * }
 * */
@Data
public class TagSpendingDTO {
    Map<String, List<String>> tags;
    DateInterval dateInterval;
}
