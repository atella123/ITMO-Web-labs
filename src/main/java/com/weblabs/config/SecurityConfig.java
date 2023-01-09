package com.weblabs.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.weblabs.filters.AuthFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

        @Autowired
        private AuthFilter authFilter;

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                return http
                                .httpBasic().disable()
                                .csrf().disable()
                                .authorizeHttpRequests(requests -> requests
                                                .requestMatchers("/main", "/api/area/**")
                                                .authenticated()
                                                .anyRequest()
                                                .permitAll())
                                .addFilterAfter(authFilter, UsernamePasswordAuthenticationFilter.class)
                                .build();
        }

}
