package com.example.demo.user.service;


import com.example.demo.common.component.MessengerVo;
import com.example.demo.common.service.CommandService;
import com.example.demo.common.service.QueryService;
import com.example.demo.user.model.User;
import com.example.demo.user.model.UserDto;

import java.util.List;
import java.util.Optional;

public interface UserService extends CommandService<UserDto>, QueryService<UserDto> {
    MessengerVo modify(UserDto user);

    List<UserDto> findUsersByName(String name);

    List<UserDto> findUsersByJob(String job);

    Optional<User> findUserByUsername(String username);


    default User dtoToEntity(UserDto dto) {
        return User.builder()
                .id(dto.getId())
                .username(dto.getUsername())
                .password(dto.getPassword())
                .name(dto.getName())
                .phone(dto.getPhone())
                .job(dto.getJob())
                .addressId(dto.getAddressId())
                .build();
    }

    default UserDto entityToDto(User user) {
        return UserDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .password(user.getPassword())
                .name(user.getName())
                .phone(user.getPhone())
                .job(user.getJob())
                .addressId(user.getAddressId())
                .regDate(user.getRegDate().toString())
                .modDate(user.getModDate().toString())
                .build();
    }

    MessengerVo login(UserDto param);
    Boolean existsByUsername(String username);

}
