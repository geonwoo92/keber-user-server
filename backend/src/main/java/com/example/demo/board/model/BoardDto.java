package com.example.demo.board.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Component;


@Component
@AllArgsConstructor
@NoArgsConstructor
@Data
@Log4j2
@Builder
public class BoardDto {

    private Long id;
    private String title;
    private String description;
    private String rogDate;
    private String modDate;
}