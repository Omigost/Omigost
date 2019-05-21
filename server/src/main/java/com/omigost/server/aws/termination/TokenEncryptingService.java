package com.omigost.server.aws.termination;

import com.omigost.server.model.ApplicationSettings;
import com.omigost.server.repository.ApplicationSettingsRepository;
import lombok.SneakyThrows;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.List;

/**
 * //TODO temporary solution
 * The idea is to send the encrypted aws id with the request in base64 format then
 * when retrieving the token to convert back and stop the machines
 */
@Service
public class TokenEncryptingService {

    private static Cipher cipher;
    private SecretKey secretKey;

    private static final String encryptionAlgorithm = "DESede";
    @Autowired
    private ApplicationSettingsRepository applicationSettingsRepository;

    //TODO fix the key from properties
    // now fixed during application runtime
    @PostConstruct
    @SneakyThrows
    private void setSecretKey() {
        List<ApplicationSettings> applicationSettingsList = applicationSettingsRepository.findAll();
        if (applicationSettingsList.isEmpty()) {
            KeyGenerator keyGenerator = KeyGenerator.getInstance(encryptionAlgorithm);
            // keysize must be equal to 168 for this provider
            keyGenerator.init(168);
            secretKey = keyGenerator.generateKey();

            ApplicationSettings newSetting = new ApplicationSettings();
            newSetting.setEncryptionToken(Base64.encodeBase64String(secretKey.getEncoded()));
            applicationSettingsRepository.save(newSetting);
        } else {
            ApplicationSettings applicationSettings = applicationSettingsList.get(0);
            byte[] secretKeyRaw = Base64.decodeBase64(applicationSettings.getEncryptionToken());
            secretKey = new SecretKeySpec(secretKeyRaw, encryptionAlgorithm);
        }
        cipher = Cipher.getInstance("DESede");
    }

    //Not sure about charset
    @SneakyThrows
    public String encryptMessage(String message) {
        byte[] messageInBytes = message.getBytes("UTF8");
        byte[] encryptedMaessage = encrypt(messageInBytes, secretKey);
        return Base64.encodeBase64String(encryptedMaessage);
    }

    @SneakyThrows
    public String descryptMessage(String encMessage) {
        byte[] received = Base64.decodeBase64(encMessage);
        byte[] decryptedBytes = decrypt(received, secretKey);
        return new String(decryptedBytes, "UTF8");
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
