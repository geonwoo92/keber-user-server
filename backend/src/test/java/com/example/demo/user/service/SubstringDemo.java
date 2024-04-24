package com.example.demo.user.service;

import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import java.awt.image.ImageProducer;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.InstanceOfAssertFactories.stream;

@Log4j2
@ExtendWith(MockitoExtension.class)
public class SubstringDemo {


    @Test
    public void 문자열_분할() {

        String data = "a,b,c";
        String str = new StringBuilder(data)
                .append(",")
                .append("d")
                .append(",")
                .append("e")
                .append(",")
                .append("f")
                .toString();
        log.info("str = {}", str);
        //a,b,c,d,e,f
        String[] arr = str.split(",");

        assertThat(arr.length).isEqualTo(6);

    }

    @Test
    public void 주민번호로_성별_구분() {

        String human1 = "970101-1";
        String human2 = "951101-2";
        String human3 = "020101-3";
        String human4 = "070101-4";

        String human5 = "730101-5";
        String human6 = "880101-6";
        String human7 = "120101-7";
        String human8 = "030101-8";


        log.info("human1 = {}", human1);
        System.out.println("휴먼 1 :" + human1);

        assertThat(getGender(human1)).isEqualTo("M");

//        //주민번호를 통해서 성별(gender)를 출력하시오. 단 나이는 만나이로 표시하시오


    }

    private String getGender(String snn) {

        return switch (snn.charAt(7)) {
            case '1', '3', '5' -> "M";
            case '2', '4', '6' -> "F";
            default -> "Error";

        };

    }

    @Test
    public void now() {
        LocalDate now = LocalDate.now();
        int year = now.getYear();
        int month = now.getMonthValue();
        int day = now.getDayOfMonth();
        assertThat(year).isEqualTo(2024);
        assertThat(month).isEqualTo(4);
        assertThat(day).isEqualTo(24);

    }

    @Test
    public void birthYear() {
        String ssn = "970301-1";
        int birthYear = Integer.parseInt(ssn.substring(0, 2));

        switch (ssn.charAt(7)) {
            case '1', '2', '5', '6' -> birthYear += 1900;
        }
        assertThat(birthYear).isEqualTo(1997);
        System.out.println(birthYear);

        String ssn2 = "020101-4";
        int birthYear2 = Integer.parseInt(ssn2.substring(0, 2));
        switch (ssn2.charAt(7)) {
            case '3', '4', '7', '8' -> birthYear2 += 2000;
        }
        assertThat(birthYear2).isEqualTo(2002);


    }

    @Test
    public void getOldAge() {
        // now(year) - birthyear +1= 나이

        LocalDate now = LocalDate.now();
        int year = now.getYear();
        int month = now.getMonthValue();
        int day = now.getDayOfMonth();

        String ssn = "970301-1";

        int birthYear = Integer.parseInt(ssn.substring(0, 2));
        birthYear += switch (ssn.charAt(7)) {
            case '1', '2', '5', '6' -> 1900;
            case '3', '4', '7', '8' -> 2000;
            default -> 1800;
        };

        int age = year - birthYear;
        int birthMonth = Integer.parseInt(ssn.substring(2, 4));
        int birthDay = Integer.parseInt(ssn.substring(4, 6));

        if (birthMonth > month) {
            age--;
        } else if (birthMonth == month) {
            if (birthDay > day) {
                age--;
            }
        }
        assertThat(age).isEqualTo(27);

    }

    @Test
    public void getAgeUsingLamda() {
        String ssn2 = "920301-1";
        LocalDate now = LocalDate.now();
        int age = Stream.of(ssn2)
                .map(ssn -> Integer.parseInt(ssn.substring(0, 2)))
                .map(birthYear -> switch (ssn2.charAt(7)) {
                    case '1', '2', '5', '6' -> birthYear + 1900;
                    case '3', '4', '7', '8' -> birthYear + 2000;
                    default -> birthYear + 1800;
                })
                .map(i->i*10000)
                .map(i-> i+ Integer.parseInt(ssn2.substring(2, 6)))
                .map(i -> (Integer.parseInt(LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd")))-i)/10000)
                .findFirst()
                .get()

                ;

        assertThat(age).isEqualTo(32);



    }
}




