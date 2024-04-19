package com.example.demo.user.service;


import com.example.demo.common.component.JwtProvider;
import com.example.demo.common.component.MessengerVo;
import com.example.demo.user.model.User;
import com.example.demo.user.model.UserDto;
import com.example.demo.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;


import java.util.Base64;
import java.util.List;
import java.util.Optional;


@Log4j2
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository repository;
    private final UserDto userDto;
    private final JwtProvider jwtProvider;


    @Override
    public MessengerVo save(UserDto userDto) {
        entityToDto((repository.save(dtoToEntity(userDto))));
        return new MessengerVo();
    }

    @Override
    public MessengerVo deleteById(Long id) {

        repository.deleteById(id);
        return MessengerVo.builder()
                .message(repository.findById(id).isPresent() ? "SUCCESS" : "FAILURE")
                .build();
    }

    @Override
    public MessengerVo modify(UserDto userDto) {

        repository.save(dtoToEntity(userDto));
        return MessengerVo.builder().message("성공").build();

//        return repository.findById(userDto.getId())
//                .stream()
//                .peek(i->userDto.setName((i.getName())==null)?userDto.setName(i.getName()):userDto.setName(i.getName()))
//                .peek(i->userDto.setJob(i.getJob()))
//                .peek(i->userDto.setPassword(i.getPassword()))
//                .peek(i->userDto.setPhone(i.getPhone()))
//                .
//                .map(user -> MessengerVo.builder().message("변경완료").build())
//                .orElseGet(() -> MessengerVo.builder().message("존재하지 않는 ID입니다").build());
    }

    @Override
    public List<UserDto> findAll() {

        return repository.findAll().stream().map(i -> entityToDto(i)).toList();
    }

    @Override
    public Optional<UserDto> findById(Long id) {
        return repository.findById(id).stream().map(i -> entityToDto(i)).findAny();
    }

    @Override
    public Long count() {
        return repository.count();
    }

    @Override
    public Boolean existsById(Long id) {
        return repository.existsById(id);
    }


    @Override
    public List<UserDto> findUsersByName(String name) {
        return List.of();
    }

    @Override
    public List<UserDto> findUsersByJob(String job) {
        throw new UnsupportedOperationException("Unimplemented method 'findUsersByJob'");
    }

    @Override
    public Optional<User> findUserByUsername(String username) {
        return repository.findByUsername(username);
    }

    @Override
    public MessengerVo existsByUsername(String username) {
        boolean flag = repository.existsByUsername(username);
        return MessengerVo.builder()
                .message(flag ? "SUCCESS" : "FAILURE")
                .build();

    }

    @Transactional
    @Override
    public MessengerVo login(UserDto param) {

        User user = repository.findByUsername(param.getUsername()).get();
        Long userId = user.getId();
        boolean flag = user.getPassword().equals(param.getPassword());
        String token = jwtProvider.createToken(entityToDto(user));

//     boolean flag = repository.findByUsername(param.getUsername()).get().getPassword().equals(param.getPassword());
//       토큰을 각 세션(Header, Payload)으로 분할
        String[] chunks = token.split("\\.");
        Base64.Decoder decoder = Base64.getUrlDecoder();

        String header = new String(decoder.decode(chunks[0]));
        String payload = new String(decoder.decode(chunks[1]));

        log.info("Token header :" + header);
        log.info("Token payload :" + payload);

        return MessengerVo.builder()
                .message(flag ? "SUCCESS" : "FAILURE")
                .token(flag ? token : "none")

                .build();

    }

}

