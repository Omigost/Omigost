package com.omigost.server.rest.dto;

import lombok.Data;

import java.util.List;

@Data
public class TerminationRequest {
    public List<String> machineIds;
}
