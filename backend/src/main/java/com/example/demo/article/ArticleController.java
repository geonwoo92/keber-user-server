package com.example.demo.article;



import com.example.demo.article.model.ArticleDto;
import com.example.demo.article.service.ArticleServiceImpl;
import com.example.demo.common.component.MessengerVo;
import com.example.demo.common.component.pagination.PageRequestVo;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@ApiResponses(value = {
        @ApiResponse(responseCode = "400", description = "Invalid ID supplied"),
        @ApiResponse(responseCode = "404", description = "Customer not found")})
@RequiredArgsConstructor
@RequestMapping(path = "/api/articles")
@Slf4j
public class ArticleController {
    private final ArticleServiceImpl service;

    @SuppressWarnings("static-access")

    @PostMapping("/save")
    public ResponseEntity<MessengerVo> Save(@RequestBody ArticleDto dto) {
        log.info("입력받은 정보: {}", dto);
        return ResponseEntity.ok(service.save(dto));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<MessengerVo> deleteById(@RequestParam("id") Long id) {
        log.info("입력받은 정보 : {}", id );
        return ResponseEntity.ok(service.deleteById(id));
    }

    @GetMapping("/list")
    public ResponseEntity<List<ArticleDto>> findByBoardId(){
        log.info("입력받은 정보 : {}" );
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/boardlist")
    public ResponseEntity<List<ArticleDto>> getArticlesById(@RequestParam("id") Long id){
        return ResponseEntity.ok(service.getArticlesById(id));
    }

    @GetMapping("/detail")
    public ResponseEntity<Optional<ArticleDto>> findById(@RequestParam("id") long id) {
        log.info("입력받은 정보 : {}",id );
        return ResponseEntity.ok(service.findById(id));
    }

    @GetMapping("/count")
    public ResponseEntity<MessengerVo> count(PageRequestVo vo) {
        service.count();
        return ResponseEntity.ok(new MessengerVo());
    }

    @GetMapping("/exists")
    public ResponseEntity<MessengerVo> existsById(@PathVariable long id) {
        service.existsById(0L);
        return ResponseEntity.ok(new MessengerVo());
    }
    @PutMapping("/modify")
    public ResponseEntity<MessengerVo> modify(@RequestBody ArticleDto param) {
        log.info("입력받은 정보 : {}", param );
        return ResponseEntity.ok(service.modify(param));
    }



}