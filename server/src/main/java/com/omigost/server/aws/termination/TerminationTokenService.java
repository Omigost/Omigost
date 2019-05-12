package com.omigost.server.aws.termination;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TerminationTokenService {
    @Autowired
    private TokenEncryptingService tokenEncryptingService;

    @Value("${aws.termination.token.timeout}")
    private long timeout;

    public String serializeToken(String awsId) {
        long currentTimeStamp = System.currentTimeMillis() / 1000;
        String token = awsId + "-" + currentTimeStamp;
        return tokenEncryptingService.encryptMessage(token);
    }

    public Optional<String> deserializeToken(String token) {
        String decryptedToken = tokenEncryptingService.descryptMessage(token);
        String[] chunks = decryptedToken.split("-");
        if (chunks.length != 2) {
            throw new IllegalArgumentException("supplied token is not valid");
        }
        long tokenTimeStamp = Long.valueOf(chunks[1]);
        long currentTimeStamp = System.currentTimeMillis() / 1000;
        long timoutInSeconds = timeout * 60 * 60;
        if (currentTimeStamp - tokenTimeStamp > timoutInSeconds) {
            return Optional.empty();
        } else {
            return Optional.of(chunks[0]);
        }
    }

}
