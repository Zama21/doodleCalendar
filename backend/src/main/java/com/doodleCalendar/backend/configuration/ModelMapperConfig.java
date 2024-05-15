package com.doodleCalendar.backend.configuration;

import com.doodleCalendar.backend.modules.event.Event;
import com.doodleCalendar.backend.modules.event.Room;
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

        return mapper;
    }
}
