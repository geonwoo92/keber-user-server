package com.example.demo.article.repository;

import com.example.demo.article.model.Article;
import com.example.demo.article.model.ArticleDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;



@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {

    //JPQL Default 방식
    @Query(" select a from articles a where a.board.id = :boardId ")
    List<Article> getArticlesById(@Param("boardId") Long boardId);

//     JPSQL Return Type DTO 방식
    String articleDtoMapping = "new com.example.demo.article.model.ArticleDto(" +
            "a.id, a.title, a.content, a.writer.id, a.board.id, a.regDate, a.modDate)";
    @Query(" select " + articleDtoMapping +" from articles a where a.board.id = :boardId ")
    List<ArticleDto> getArticleDTOByBoardId(@Param("boardId") Long boardId);


    List<Article> findAllByOrderByIdDesc();

    //    //Native 방식
//    @Query(value = " select * from articles a where a.board.id = 1 ",nativeQuery = true)
//    public List<Article> getQnaArticles(); // Review 카테고리값이 1
//
//    @Query(value = " select * from articles a where a.board.id = 2 ",nativeQuery = true)
//    public List<Article> getQnaArticles2(); // Review 카테고리값이 2

}

