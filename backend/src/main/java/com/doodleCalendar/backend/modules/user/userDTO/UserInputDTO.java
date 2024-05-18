package com.doodleCalendar.backend.modules.user.userDTO;

import lombok.Data;

@Data
public class UserInputDTO {

    //TODO убрать id или login взависимости от авторизации через lms
    private String login;
    private String name;
    private String surname;
    private String patronymic;
    private String email;
    private String password;
}
