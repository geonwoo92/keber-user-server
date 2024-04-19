package com.example.demo.user.service;


import com.example.demo.common.component.MessengerVo;
import com.example.demo.user.model.UserDto;
import com.example.demo.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import static org.assertj.core.api.Assertions.assertThat;


@ExtendWith(SpringExtension.class)
@SpringBootTest
@Transactional
public class UserServiceImplTest {
    @Autowired
    UserService Service;
    @Autowired
    private UserDto userDto;


    @DisplayName(("가입된 회원수"))
    @Test
    void count() {

        Assertions.assertEquals(Service.count(), 14, 2);
    }

}