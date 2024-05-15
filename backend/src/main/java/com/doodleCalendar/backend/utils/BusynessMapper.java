package com.doodleCalendar.backend.utils;

import com.doodleCalendar.backend.modules.busyness.Busyness;
import com.doodleCalendar.backend.modules.busyness.busynessDTO.OneTimeBusynessInputDTO;
import com.doodleCalendar.backend.modules.busyness.busynessDTO.OneTimeBusynessOutputDTO;
import com.doodleCalendar.backend.modules.busyness.busynessDTO.RepeatsBusynessInputDTO;
import com.doodleCalendar.backend.modules.busyness.busynessDTO.RepeatsBusynessOutputDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class BusynessMapper {

    @Autowired
    private ModelMapper modelMapper;

    public OneTimeBusynessOutputDTO OneTimeBusynessOutput(Busyness busyness){
        return modelMapper.map(busyness, OneTimeBusynessOutputDTO.class);
    }
    public RepeatsBusynessOutputDTO RepeatsBusynessOutput(Busyness busyness){
        return modelMapper.map(busyness, RepeatsBusynessOutputDTO.class);
    }

    public Busyness RepeatsBusynessInput(RepeatsBusynessInputDTO busynessInputDTO){
        return modelMapper.map(busynessInputDTO, Busyness.class);
    }

    public Busyness OneTimeBusynessInput(OneTimeBusynessInputDTO busynessInputDTO){
        return modelMapper.map(busynessInputDTO, Busyness.class);
    }
}
