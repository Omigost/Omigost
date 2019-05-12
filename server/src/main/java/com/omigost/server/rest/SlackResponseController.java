package com.omigost.server.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.omigost.server.aws.termination.SlackCommunicationService;
import com.omigost.server.rest.dto.SlackResponse.SlackResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("${slack.response.endpoint}")
public class SlackResponseController {
    private ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    SlackCommunicationService communicationService;

    @PostMapping
    //slack sends without application/json header, so conversion should be done manually
    public String slackResponseHandler(@RequestParam Map<String, String> body) throws IOException {
        SlackResponseDTO responseDTO = objectMapper.readValue(body.get("payload"), SlackResponseDTO.class);
        return communicationService.slackResponseHandler(responseDTO);
    }
}
