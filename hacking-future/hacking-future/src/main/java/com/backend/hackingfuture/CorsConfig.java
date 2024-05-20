package com.backend.hackingfuture;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(@SuppressWarnings("null") CorsRegistry registry) {
        registry.addMapping("/api/v1/**")
            .allowedOrigins("http://localhost:3000") // Allow requests from your React app origin
            .allowedMethods("GET", "POST", "PUT", "DELETE") // Allow specific HTTP methods
            .allowCredentials(true); // Allow sending cookies from the client

        registry.addMapping("/api")
            .allowedOrigins("http://localhost:3000") // Allow requests from your React app origin
            .allowedMethods("GET", "POST", "PUT", "DELETE") // Allow specific HTTP methods
            .allowCredentials(true); // Allow sending cookies from the client

            
    }
}

