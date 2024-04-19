package com.example.demo.common.service;

import com.example.demo.common.component.PageRequestVo;
import org.yaml.snakeyaml.events.Event;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;
//조회
public interface QueryService <T>{

    List<T> findAll();
    Optional<T> findById(Long id);
    Long count();
    Boolean existsById(Long id);

}
