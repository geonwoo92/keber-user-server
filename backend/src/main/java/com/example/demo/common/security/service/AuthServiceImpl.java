package com.example.demo.common.security.service;

import com.example.demo.common.component.MessengerVo;
import com.example.demo.user.model.UserDto;
import com.example.demo.user.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Log4j2
@RequiredArgsConstructor
@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository repository;


    @Override
    public MessengerVo login(UserDto param) {
        boolean flag = repository.findByUsername(param.getUsername()).get().getPassword().equals(param.getPassword());

        return MessengerVo.builder()
                .message(flag ? "SUCCESS" : "FAILURE")
                .accessToken(flag ? createToken(param) : "none")
                .build();


    }

    @Override
    public String createToken(UserDto user) {
        Claims claims = (Claims) Jwts.claims();
        claims.put("username", user.getUsername());

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime tokenValidTime = now.plusSeconds(24 * 60 * 60 * 1000);


        String token = Jwts.builder()
                .claims()
                .issuer( "erichgamma.co.kr")
                .add("sub", "User Auth")
                .add("exp", tokenValidTime)
                .add("userId", user.getId())
                .add("username", user.getUsername())
                .add("job", "admin")
                .and()
                .compact();

        log.info("로그인 성공으로 발급된 토큰 " + token);
        return token;
    }
}
