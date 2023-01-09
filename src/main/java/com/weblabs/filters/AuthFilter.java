package com.weblabs.filters;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.weblabs.model.User;
import com.weblabs.model.UserAuthentication;
import com.weblabs.services.AuthService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class AuthFilter extends OncePerRequestFilter {

    @Autowired
    private AuthService authService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String header = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (header == null || !isHeaderVaild(header)) {
            filterChain.doFilter(request, response);
            return;
        }

        User user = authService.parseAuthHeader(header);
        UserAuthentication auth = authService.authenticateUser(user);
        SecurityContextHolder.getContext().setAuthentication(auth);

        filterChain.doFilter(request, response);
    }

    private boolean isHeaderVaild(String header) {
        String[] splittedHeader = header.split(" ");

        return splittedHeader.length == 2 && splittedHeader[0].equals("Basic");
    }

}
