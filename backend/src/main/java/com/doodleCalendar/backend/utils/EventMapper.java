package com.doodleCalendar.backend.utils;

import com.doodleCalendar.backend.model.event.Event;
import com.doodleCalendar.backend.model.event.eventDTO.CreateEventInputDto;
import com.doodleCalendar.backend.model.event.eventDTO.EventInfoOutputDto;
import com.doodleCalendar.backend.model.event.eventDTO.EventOutputDto;
import com.doodleCalendar.backend.model.event.eventDTO.UpdateEventInputDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class EventMapper {

    @Autowired
    private ModelMapper modelMapper;

    public EventOutputDto eventOutput(Event event) {
        return modelMapper.map(event, EventOutputDto.class);
    }

    public EventInfoOutputDto eventInfoOutput(Event event) {
        return modelMapper.map(event, EventInfoOutputDto.class);
    }

    public Event createEventDtoToEntity(CreateEventInputDto dto) {
        return modelMapper.map(dto, Event.class);
    }
    public Event updateEventDtoToEntity(UpdateEventInputDto dto) {
        return modelMapper.map(dto, Event.class);
    }

}
