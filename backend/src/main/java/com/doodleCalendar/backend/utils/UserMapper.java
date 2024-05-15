package com.doodleCalendar.backend.utils;

import com.doodleCalendar.backend.modules.user.User;
import com.doodleCalendar.backend.modules.user.userDTO.UserInputDTO;
import com.doodleCalendar.backend.modules.user.userDTO.UserProfileOutputDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    @Autowired
    private ModelMapper modelMapper;

    public UserProfileOutputDTO userToUserProfile(User user){
        return modelMapper.map(user, UserProfileOutputDTO.class);
    }

    public User userDTOToUser(UserInputDTO userInputDTO){
        return modelMapper.map(userInputDTO, User.class);
    }
}
