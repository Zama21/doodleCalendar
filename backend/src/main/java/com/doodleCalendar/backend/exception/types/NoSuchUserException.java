package com.doodleCalendar.backend.exception.types;

import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@NoArgsConstructor
@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Пользователь не найден")
public class NoSuchUserException extends RuntimeException{
}
