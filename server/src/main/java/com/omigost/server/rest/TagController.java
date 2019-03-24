package com.omigost.server.rest;

import com.amazonaws.services.costexplorer.model.DateInterval;
import com.amazonaws.services.ec2.model.Tag;
import com.omigost.server.aws.TaggingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/tag")
public class TagController {
    @Autowired
    TaggingService taggingService;

    @GetMapping("/cost")
    List<String> getCostAllocationKeys(@RequestParam String start, @RequestParam String end) {
        DateInterval interval = new DateInterval().withStart(start).withEnd(end);
        return taggingService.fetchAllCostAllocationTagKeys(interval);
    }

    @GetMapping("/cost/ec2")
    List<Tag> getEC2CostAllocationTags(@RequestParam String start, @RequestParam String end) {
        DateInterval interval = new DateInterval().withStart(start).withEnd(end);
        return taggingService.fetchEC2CostAllocationTags(interval);
    }
}
