package com.doodleCalendar.backend.modules.event.eventDTO;

import lombok.Data;

@Data
public class EventMemberInfoDto {
    public Long id;
    public String name;
    public String surname;
    public String patronymic;
    public Boolean isBusy;
}