package com.doodleCalendar.backend.utils;

import com.doodleCalendar.backend.modules.event.Event;
import com.doodleCalendar.backend.modules.event.Room;
import com.doodleCalendar.backend.modules.event.eventDTO.*;
import com.doodleCalendar.backend.modules.event.eventDTO.calendar.EventForMonthOutputDTO;
import com.doodleCalendar.backend.modules.event.eventDTO.calendar.EventForMonthWithRoomsOutputDTO;
import com.doodleCalendar.backend.modules.user.User;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.stream.Collectors;

@Component
public class EventMapper {

    private ModelMapper modelMapper;

    @Autowired
    public EventMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
        Converter<Set<User>, Set<EventMemberInfoDto>> membersEntityToDtoConverter = context -> {
            Event event = (Event) context.getParent().getSource();
            Set<EventMemberInfoDto> memberInfoList = context.getSource().stream()
                    .map(member -> {
                        EventMemberInfoDto dto = modelMapper.map(member, EventMemberInfoDto.class);
                        dto.isBusy = member.isBusyDuring(event.getStartsAt(), event.getEndsAt());
                        return dto;
                    }).collect(Collectors.toSet());
            return memberInfoList;
        };

        Converter<Set<Room>, Set<String>> roomsEntityToDtoConverter = context ->
                context.getSource().stream().map(room -> room.getValue()).collect(Collectors.toSet());

        TypeMap<Event, EventInfoOutputDto> eventToEventInfoMap = modelMapper.createTypeMap(Event.class, EventInfoOutputDto.class);
        eventToEventInfoMap.addMappings(mapping -> {
            mapping.using(membersEntityToDtoConverter).map(Event::getMembers, EventInfoOutputDto::setMembers);
            mapping.using(roomsEntityToDtoConverter).map(Event::getRooms, EventInfoOutputDto::setRooms);
        });
    }

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

    public EventForMonthOutputDTO eventToEventForMonthOutputDTO(Event event) {
        return modelMapper.map(event, EventForMonthOutputDTO.class);
    }

    public EventForMonthWithRoomsOutputDTO eventToEventForMonthWithRoomsOutputDTO(Event event) {
        return modelMapper.map(event, EventForMonthWithRoomsOutputDTO.class);
    }
}
