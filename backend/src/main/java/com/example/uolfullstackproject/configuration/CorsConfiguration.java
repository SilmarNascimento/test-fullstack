package com.example.uolfullstackproject.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfiguration implements WebMvcConfigurer {
  @Value("${spring.frontend.domain}")
  private String frontendDomain;

  @Value("${spring.frontend.port}")
  private String frontendPort;

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    String frontendUrl = "http://" + frontendDomain + ":" + frontendPort;

    registry.addMapping("/**")
        .allowedOrigins(frontendUrl)
        .allowedMethods("GET", "POST", "PUT", "DELETE");
  }

}