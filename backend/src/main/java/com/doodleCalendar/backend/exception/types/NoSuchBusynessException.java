package com.doodleCalendar.backend.exception.types;

import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@NoArgsConstructor
@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Занятость не найден")
public class NoSuchBusynessException {
}
