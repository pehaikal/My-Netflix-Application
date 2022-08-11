package fr.epita.config;


import fr.epita.exceptions.BadConfigurationException;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class Configuration {

    private static Configuration instance;
    private Properties properties;

    private Configuration() {
    }

    public static synchronized Configuration getInstance() {
        if (instance == null) {
            instance = new Configuration();
            Properties properties = new Properties();
            String confFile = System.getProperty("conf.file.path");
            try {
                properties.load(new FileInputStream(confFile));
            } catch (IOException e) {
                throw new BadConfigurationException("The file was not found at location: " + confFile);
            }
            instance.properties = properties;
        }
        return instance;
    }

    public String getDBUser() {
        return properties.getProperty("db.user");
    }

    public String getDBPassword() {
        return properties.getProperty("db.password");
    }

    public String getDBUrl() {
        return properties.getProperty("db.url");
    }
}
