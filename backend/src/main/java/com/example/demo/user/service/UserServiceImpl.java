package com.example.demo.user.service;


import com.example.demo.board.model.BoardDto;
import com.example.demo.common.component.security.JwtProvider;
import com.example.demo.common.component.MessengerVo;
import com.example.demo.user.model.User;
import com.example.demo.user.model.UserDto;
import com.example.demo.user.repository.UserRepository;
import io.jsonwebtoken.Jwts;
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
    private final BoardDto boardDto;


    @Override
    public MessengerVo save(UserDto userDto) {
        var ent = repository.save(dtoToEntity(userDto));
        System.out.println(" ============ UserServiceImpl save instanceof =========== ");
        System.out.println((ent instanceof User) ? "SUCCESS" : "FAILURE");
        return MessengerVo.builder()
                .message((ent instanceof User) ? "SUCCESS" : "FAILURE")
                .build();
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
    public Boolean existsByUsername(String username) {
        Integer count = repository.existsByUsername(username);
        return count == 1;
    }



    @Transactional
    @Override
    public MessengerVo login(UserDto dto) {
        log.info("로그인 서비스로 들어온 파라미터 : " + dto);
        var user = repository.findByUsername(dto.getUsername()).get();
        var accessToken = jwtProvider.createToken(entityToDto(user));
        var flag = user.getPassword().equals(dto.getPassword());
        // passwordEncoder.matches

        // 토큰을 각 섹션(Header, Payload, Signature)으로 분할
        jwtProvider.printPayload(accessToken);
        repository.modifyTokenById(user.getId(), accessToken);

        return MessengerVo.builder()
                .message(flag ? "SUCCESS" : "FAILURE")
                .accessToken(flag ? accessToken : "None")
                .build();
    }
    @Transactional
    @Override
    public Boolean logout(String accessToken) {
        Long id = userDto.getId()
                ;
        String deletedToken = "";
        repository.modifyTokenById(id,deletedToken);

        Optional<User> s= repository.findById(id);

        return s.get().getToken().equals("");
    }


}

