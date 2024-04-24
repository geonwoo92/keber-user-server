package com.example.demo.user;


import com.example.demo.common.component.MessengerVo;
import com.example.demo.common.component.pagination.PageRequestVo;
import com.example.demo.user.model.UserDto;
import com.example.demo.user.service.UserServiceImpl;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@ApiResponses(value = {
        @ApiResponse(responseCode = "400", description = "Invalid ID supplied"),
        @ApiResponse(responseCode = "404", description = "Customer not found")})
@RequiredArgsConstructor
@RequestMapping(path = "/api/users")
@Slf4j
public class UserController {
    private final UserServiceImpl service;

    @SuppressWarnings("static-access")
    @PostMapping("/save")
    public ResponseEntity<MessengerVo> Save(@RequestBody UserDto dto) {
        log.info("입력받은 정보: {}", dto);
        return ResponseEntity.ok(service.save(dto));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<MessengerVo> deleteById(@RequestParam Long id) {
        log.info("입력받은 정보 : {}", id );
        return ResponseEntity.ok(new MessengerVo());
    }

    @GetMapping("/list")
    public ResponseEntity<List<UserDto>> findAll(){
        log.info("입력받은 정보 : {}" );
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/detail")
    public ResponseEntity<Optional<UserDto>> findById(@RequestParam long id) {
        log.info("입력받은 정보 : {}",id );
        return ResponseEntity.ok(service.findById(id));
    }

    @GetMapping("/count")
    public ResponseEntity<MessengerVo> count(PageRequestVo vo) {
        service.count();
        return ResponseEntity.ok(new MessengerVo());
    }

    @GetMapping("/exists")
    public ResponseEntity<MessengerVo> existsById(@RequestParam Long id) {
        service.existsById(0L);
        return ResponseEntity.ok(new MessengerVo());
    }

    @PutMapping("/modify")
    public ResponseEntity<MessengerVo> modify(@RequestBody UserDto param) {
        log.info("입력받은 정보 : {}", param );
        return ResponseEntity.ok(service.modify(param));
    }

    @PostMapping("/search")
    public ResponseEntity<List<UserDto>> findUsersByName(@RequestBody UserDto param) {
        //log.info("입력받은 정보 : {}", name );
        return ResponseEntity.ok(service.findUsersByName(param.getName()));
    }

    @GetMapping("/logout")
    public ResponseEntity<Boolean> logout(@RequestHeader("Authorization") String accessToken) {

        log.info("logout request : {}", accessToken);
        var flag = service.logout(accessToken);//토큰이 없으면 true, 있으면 false
        return ResponseEntity.ok(flag);
    }

}