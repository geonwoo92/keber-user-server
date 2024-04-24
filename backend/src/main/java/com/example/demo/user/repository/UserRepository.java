package com.example.demo.user.repository;

import com.example.demo.article.model.Article;
import com.example.demo.article.model.ArticleDto;
import com.example.demo.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {


    Optional<User> findByUsername(String username);


    @Query("select count(id) as count from users where username = :username")
    Integer existsByUsername(@Param("username") String username);


    @Modifying
    @Query("update users set token = :token where id = :id")
    public void  modifyTokenById(@Param("id") Long id, @Param("token") String token );

}
