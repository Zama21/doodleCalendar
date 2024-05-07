package com.doodleCalendar.backend.modules.busyness;

import com.doodleCalendar.backend.modules.busyness.busynessDTO.OneTimeBusynessInputDTO;
import com.doodleCalendar.backend.modules.busyness.busynessDTO.OneTimeBusynessOutputDTO;
import com.doodleCalendar.backend.modules.busyness.busynessDTO.RepeatsBusynessInputDTO;
import com.doodleCalendar.backend.modules.busyness.busynessDTO.RepeatsBusynessOutputDTO;
import com.doodleCalendar.backend.utils.BusynessMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BusynessService {

    @Autowired
    private BusynessRepository busynessRepository;
    @Autowired
    private BusynessMapper busynessMapper;

    public List<OneTimeBusynessOutputDTO> getNoRepeatsBusyness(Long userId){
        List<Busyness> busynesses = busynessRepository.findAllByUserIdAndRepeatWeekDayIsNull(userId);
        return busynesses.stream().map(x -> busynessMapper.OneTimeBusynessOutput(x)).toList();
    }

    public List<RepeatsBusynessOutputDTO> getRepeatsBusyness(Long userId){
        List<Busyness> busynesses = busynessRepository.findAllByUserIdAndRepeatWeekDayIsNotNull(userId);
        return busynesses.stream().map(x -> busynessMapper.RepeatsBusynessOutput(x)).toList();
    }

    public List<RepeatsBusynessOutputDTO> createRepeatsBusyness(List<RepeatsBusynessInputDTO> busynessInputDTOs){
        List<Busyness> busynesses = busynessInputDTOs.stream().map(
                x -> busynessMapper.RepeatsBusynessInput(x)).toList();
        busynessRepository.saveAll(busynesses);
        return busynesses.stream().map(x -> busynessMapper.RepeatsBusynessOutput(x)).toList();
    }

    public List<OneTimeBusynessOutputDTO> createOneTimesBusyness(List<OneTimeBusynessInputDTO> busynessInputDTOs){
        List<Busyness> busynesses = busynessInputDTOs.stream().map(
                x -> busynessMapper.OneTimeBusynessInput(x)).toList();
        busynessRepository.saveAll(busynesses);
        return busynesses.stream().map(x -> busynessMapper.OneTimeBusynessOutput(x)).toList();
    }

}
