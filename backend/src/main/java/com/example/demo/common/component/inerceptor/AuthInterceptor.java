package com.example.demo.common.component.inerceptor;


import com.example.demo.common.component.security.JwtProvider;
import com.example.demo.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import java.util.stream.Stream;

@Log4j2
@Component
@RequiredArgsConstructor
public class AuthInterceptor implements HandlerInterceptor {

    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;


    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
//        String token = jwtProvider.extractTokenFromHeader(request);
//
//        log.info("1-인터셉터 토큰 로그 Bearer 포함: {} ", token);
//
//        if (token.equals("undefined")) {
//            response.sendError(HttpServletResponse.SC_BAD_REQUEST);
//            return false;
//        }
//
//        Long id = jwtProvider.getPayload(token).get("id", Long.class); //디스크 정적 객체\
//        log.info("2-인터셉터 사용자 id : {}", id);
//
//
//        Optional<User> user = userRepository.findById(id);
//
//        log.info("3-인터셉터 사용자 정보: {}", user);
//
//        if (!user.isPresent()) {
//            response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
//            return false;
//        }
//
//        log.info("4-인터셉터 최종 여부 {}", true);

        return Stream.of(request)
                .map(i -> jwtProvider.extractTokenFromHeader(i))
                .filter(token -> !token.equals("undefined"))
                .peek(token->log.info("1-인터셉터 토큰 로그 Bearer 포함: {} ",token ))
                .peek(token->jwtProvider.printPayload(token))
                .map(token -> jwtProvider.getPayload(token).get("userId", Long.class))
                .peek(i->log.info("2-인터셉터 토큰 로그 Bearer 포함: {} ",i ))

                .map(id -> userRepository.findById(id))
                .filter(id -> id.isPresent())
                .peek(id->log.info("3-인터셉터 사용자 id : {}",id))
                .findAny()
                .isPresent();

    }
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
    }
}
