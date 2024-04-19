package com.example.demo.common.service;

import com.example.demo.common.component.MessengerVo;
import org.apache.logging.log4j.message.Message;

//값 변경
public interface CommandService<T> {

    MessengerVo save(T t);
    MessengerVo deleteById(Long id);
    MessengerVo modify(T t);
}
