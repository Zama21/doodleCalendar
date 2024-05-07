package com.doodleCalendar.backend.configuration;

import com.doodleCalendar.backend.modules.event.Event;
import com.doodleCalendar.backend.modules.event.eventDTO.EventInfoOutputDto;
import com.doodleCalendar.backend.modules.event.eventDTO.EventMemberInfoDto;
import com.doodleCalendar.backend.modules.user.User;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.stream.Collectors;

@Component
public class ModelMapperConfig {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        configureEventsMapping(mapper);

        return mapper;
    }

    private void configureEventsMapping(ModelMapper mapper) {
        Converter<Set<User>, Set<EventMemberInfoDto>> membersConverter = context -> {
            Event event = (Event)context.getParent().getSource();
            Set<EventMemberInfoDto> memberInfoList = context.getSource().stream()
                    .map(member -> {
                        EventMemberInfoDto dto = mapper.map(member, EventMemberInfoDto.class);
                        dto.isBusy = member.isBusyDuring(event.getStartsAt(), event.getEndsAt());
                        return dto;
                    }).collect(Collectors.toSet());
            return memberInfoList;
        };

        TypeMap<Event, EventInfoOutputDto> eventToEventInfoMap = mapper.createTypeMap(Event.class, EventInfoOutputDto.class);
        eventToEventInfoMap.addMappings(mapping -> {
            mapping.using(membersConverter).map(Event::getMembers, EventInfoOutputDto::setMembers);
        });

//        Converter<Set<Integer>, Set<User>> memberIdsConverter = context -> {
//            Event event = (Event)context.getParent().getSource();
//            Set<EventMemberInfoDto> memberInfoList = context.getSource().stream()
//                    .map(member -> {
//                        EventMemberInfoDto dto = mapper.map(member, EventMemberInfoDto.class);
//                        dto.isBusy = member.isBusyDuring(event.getStartsAt(), event.getEndsAt());
//                        return dto;
//                    }).collect(Collectors.toSet());
//            return memberInfoList;
//        };
//
//        TypeMap<CreateEventInputDto, Event> createEventInputToEventMap = mapper.createTypeMap(CreateEventInputDto.class, Event.class);
//        createEventInputToEventMap.addMappings(mapping -> {
//            mapping.using(memberIdsConverter).map(CreateEventInputDto::getMembersIds, Event::setMembers);
//        });


    }

}
