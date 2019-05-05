package com.omigost.server.settings;

import com.omigost.server.localstack.PostgresContainer;
import com.omigost.server.settings.model.InstanceSettingsUpdateDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.*;
import org.springframework.stereotype.Service;
import org.springframework.util.DefaultPropertiesPersister;

import java.io.*;
import java.util.*;

import org.springframework.cloud.context.restart.RestartEndpoint;

@Service
@Slf4j
public class InstanceSettingsService {

    @Autowired
    private Environment env;

    @Autowired
    RestartEndpoint restartEndpoint;

    private static final String RUNTIME_PROPERTIES_FILE_LOCATION = "app-properties.properties";

    private static Properties loadRuntimeProperties() {
        Properties props = null;
        try {
            props = new Properties();

            File f = new File(RUNTIME_PROPERTIES_FILE_LOCATION);
            InputStream in = new FileInputStream(f);
            props.load(in);

        } catch(IOException e) {
            log.error("Failed to load runtime instance properties file");
        }
        return props;
    }

    private static void storeRuntimeProperties(final Properties props) {
        try {
            File f = new File(RUNTIME_PROPERTIES_FILE_LOCATION);
            OutputStream out = new FileOutputStream(f);
            DefaultPropertiesPersister p = new DefaultPropertiesPersister();
            p.store(props, out, "Automatically generated config. Please do not edit.");
        } catch(IOException e) {
            log.error("Failed to store runtime instance properties file");
        }
    }

    public InstanceSettingsUpdateDTO getSettings() {
        Map<String, Object> configurableProperties = new HashMap<>();
        for (PropertySource<?> propertySource : ((AbstractEnvironment) env).getPropertySources()) {
            if (propertySource instanceof MapPropertySource) {
                configurableProperties.putAll(((MapPropertySource) propertySource).getSource());
            }
        }

        Map<String, String> effectiveProperties = new HashMap<>();
        for (String propertyName: configurableProperties.keySet()) {
            effectiveProperties.put(propertyName, env.getProperty(propertyName));
        }

        InstanceSettingsUpdateDTO result = new InstanceSettingsUpdateDTO();
        result.setProperties(effectiveProperties);
        return result;
    }

    public InstanceSettingsUpdateDTO updateSettings(final InstanceSettingsUpdateDTO updateParams) {
        Properties props = loadRuntimeProperties();
        props.putAll(updateParams.getProperties());
        storeRuntimeProperties(props);
        return updateParams;
    }

    public static class Initializer implements ApplicationContextInitializer<ConfigurableApplicationContext> {
        public void initialize(ConfigurableApplicationContext configurableApplicationContext) {
            try {
                ConfigurableEnvironment env = configurableApplicationContext.getEnvironment();
                env.getPropertySources().addFirst(new PropertiesPropertySource(this.getClass().getCanonicalName(), loadRuntimeProperties()));
                configurableApplicationContext.setEnvironment(env);
            } catch(Exception e) {
                e.printStackTrace();
            }
        }
    }

}
