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

//SELECT DISTINCT (SELECT s.stadium_name
//        FROM stadium s
//        WHERE s.stadium_id = sch.stadium_id)

    @Modifying
    @Query("update users set token = :token where id = :id")
    public void modifyTokenById(@Param("id") Long id, @Param("token") String token);

    List<User> findAllByOrderById();
}
//SELECT DISTINCT (SELECT s.stadium_name
//        FROM stadium s
//        WHERE s.stadium_id = sch.stadium_id) '경기장'
//FROM schedule sch
//WHERE YEAR(sch.sche_date) = 2012
//AND MONTH(sch.sche_date) = 5