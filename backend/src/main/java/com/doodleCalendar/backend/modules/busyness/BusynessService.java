package com.doodleCalendar.backend.modules.busyness;


import com.doodleCalendar.backend.modules.busyness.busynessDTO.OneTimeBusynessInputDTO;
import com.doodleCalendar.backend.modules.busyness.busynessDTO.OneTimeBusynessOutputDTO;
import com.doodleCalendar.backend.exception.types.NoSuchUserException;
import com.doodleCalendar.backend.modules.busyness.busynessDTO.RepeatsBusynessInputDTO;
import com.doodleCalendar.backend.modules.busyness.busynessDTO.RepeatsBusynessOutputDTO;
import com.doodleCalendar.backend.modules.user.User;
import com.doodleCalendar.backend.modules.user.UserRepository;
import com.doodleCalendar.backend.utils.BusynessMapper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BusynessService {

    @Autowired
    private BusynessRepository busynessRepository;
    @Autowired
    private BusynessMapper busynessMapper;
    @Autowired
    private UserRepository userRepository;

    public List<OneTimeBusynessOutputDTO> getNoRepeatsBusyness(Long userId){
        List<Busyness> busynesses = busynessRepository.findAllByUserIdAndRepeatWeekDayIsNull(userId);
        return busynesses.stream().map(x -> busynessMapper.OneTimeBusynessOutput(x)).toList();
    }

    public List<RepeatsBusynessOutputDTO> getRepeatsBusyness(Long userId){
        List<Busyness> busynesses = busynessRepository.findAllByUserIdAndRepeatWeekDayIsNotNull(userId);
        return busynesses.stream().map(x -> busynessMapper.RepeatsBusynessOutput(x)).toList();
    }

    @Transactional
    public List<RepeatsBusynessOutputDTO> createRepeatsBusyness(List<RepeatsBusynessInputDTO> busynessInputDTOs,
                                                                Long userId){
        List<Busyness> busynesses = busynessInputDTOs.stream().map(
                x -> busynessMapper.RepeatsBusynessInput(x)).toList();
        User user = userRepository.findById(userId).orElseThrow(NoSuchUserException::new);
        busynesses.forEach(item -> item.setUser(user));
        busynessRepository.deleteByUserId(userId);
        busynessRepository.saveAll(busynesses);
        return busynesses.stream().map(x -> busynessMapper.RepeatsBusynessOutput(x)).toList();
    }

    @Transactional
    public List<OneTimeBusynessOutputDTO> createOneTimesBusyness(List<OneTimeBusynessInputDTO> busynessInputDTOs,
                                                                 Long userId){
        List<Busyness> busynesses = busynessInputDTOs.stream().map(
                x -> busynessMapper.OneTimeBusynessInput(x)).toList();
        User user = userRepository.findById(userId).orElseThrow(NoSuchUserException::new);
        busynesses.forEach(item -> item.setUser(user));
        busynessRepository.deleteByUserId(userId);
        busynessRepository.saveAll(busynesses);
        return busynesses.stream().map(x -> busynessMapper.OneTimeBusynessOutput(x)).toList();
    }

}
