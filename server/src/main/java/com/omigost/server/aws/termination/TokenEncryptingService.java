package com.omigost.server.aws.termination;

import lombok.SneakyThrows;
import org.apache.commons.codec.binary.Base64;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;

/**
 * //TODO temporary solution
 * The idea is to send the encrypted aws id with the request in base64 format then
 * when retrieving the token to convert back and stop the machines
 */
@Service
public class TokenEncryptingService {

    private static Cipher cipher;
    private SecretKey secretKey;

    //TODO fix the key from properties
    // now fixed during application runtime
    @PostConstruct
    @SneakyThrows
    private void setSecretKey() {
        KeyGenerator keyGenerator = KeyGenerator.getInstance("DESede");
        // keysize must be equal to 112 or 168 for this provider
        keyGenerator.init(168);
        secretKey = keyGenerator.generateKey();
        cipher = Cipher.getInstance("DESede");
    }

    @SneakyThrows
    public String encryptMessage(String message) {
        byte[] messageInBytes = message.getBytes();
        byte[] encryptedMaessage = encrypt(messageInBytes, secretKey);
        return Base64.encodeBase64String(encryptedMaessage);
    }

    @SneakyThrows
    public String descryptMessage(String encMessage) {
        byte[] received = Base64.decodeBase64(encMessage);
        byte[] decryptedBytes = decrypt(received, secretKey);
        return new String(decryptedBytes);
    }

    @SneakyThrows
    private byte[] encrypt(byte[] plainTextByte, SecretKey secretKey) {
        cipher.init(Cipher.ENCRYPT_MODE, secretKey);
        return cipher.doFinal(plainTextByte);
    }

    @SneakyThrows
    private byte[] decrypt(byte[] encryptedBytes, SecretKey secretKey) {
        cipher.init(Cipher.DECRYPT_MODE, secretKey);
        return cipher.doFinal(encryptedBytes);
    }
}
