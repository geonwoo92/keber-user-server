package com.example.demo.article.service;

import com.example.demo.article.model.Article;
import com.example.demo.article.model.ArticleDto;
import com.example.demo.article.repository.ArticleRepository;
import com.example.demo.common.component.MessengerVo;
import com.example.demo.user.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ArticleServiceImpl implements ArticleService {

    private final ArticleRepository repository;


    @Override
    public MessengerVo save(ArticleDto articleDto) {
        Article ent = repository.save(dtoToEntity(articleDto));
        System.out.println(" ============ BoardServiceImpl save instanceof =========== ");
        System.out.println((ent instanceof Article) ? "SUCCESS" : "FAILURE");
        return MessengerVo.builder()
                .message((ent instanceof Article) ? "SUCCESS" : "FAILURE")
                .id(ent.getBoard().getId())
                .build();
    }

    @Override
    public MessengerVo deleteById(Long id) {
        repository.deleteById(id);
        return MessengerVo.builder().message("게시글 삭제").build();
    }

    @Override
    public MessengerVo modify(ArticleDto articleDto) {

        return null;

    }

    @Override
    public List<ArticleDto> findAll() {
        return repository.findAll().stream().map(i->entityToDto(i)).toList();
    }

    @Override
    public Optional<ArticleDto> findById(Long id) {
        return repository.findById(id).stream()
                .filter(i->i.getBoard().equals(id))
                .map(i -> entityToDto(i)).findAny();
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
    public List<ArticleDto> getArticlesById(Long id) {
        return repository.getArticlesById(id).stream().map(i->entityToDto(i)).toList();
    }

}
