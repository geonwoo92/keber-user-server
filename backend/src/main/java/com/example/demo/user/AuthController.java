package com.example.demo.user;

import com.example.demo.common.component.MessengerVo;
import com.example.demo.common.component.pagination.PageRequestVo;
import com.example.demo.user.model.UserDto;
import com.example.demo.user.service.UserServiceImpl;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@ApiResponses(value = {
        @ApiResponse(responseCode = "400", description = "Invalid ID supplied"),
        @ApiResponse(responseCode = "404", description = "Customer not found")})
@RequiredArgsConstructor
@RequestMapping(path = "/api/auth")
@Slf4j
public class AuthController {

    private final UserServiceImpl service;


    @PostMapping(path = "/findlogin")
    public ResponseEntity<MessengerVo> login(@RequestBody UserDto param) {
        log.info("입력받은 정보 : {}", param );
        return ResponseEntity.ok(service.login(param));
    }

    @GetMapping("/exists-username")
    public ResponseEntity<Boolean> existsByUsername(@RequestParam("username") String username) {

        log.info("existsUsernam 파라미터 정보 : "+username);
        Boolean flag = service.existsByUsername(username);
        log.info("existsUsernam 결과 : "+flag);
        return ResponseEntity.ok(flag);
    }
}
