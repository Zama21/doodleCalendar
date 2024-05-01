package com.doodleCalendar.backend.model.user;

import com.doodleCalendar.backend.exception.types.NoSuchUserException;
import com.doodleCalendar.backend.model.user.userDTO.UserInputDTO;
import com.doodleCalendar.backend.model.user.userDTO.UserProfileOutputDTO;
import com.doodleCalendar.backend.utils.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserMapper userMapper;

    public UserProfileOutputDTO getUserProfile(Long userId){
        User user = userRepository.findById(userId).orElseThrow(NoSuchUserException::new);
        return userMapper.userToUserProfile(user);
    }

    public UserProfileOutputDTO createUser(UserInputDTO userInputDTO){
        User user = userMapper.userDTOToUser(userInputDTO);
        userRepository.save(user);
        return userMapper.userToUserProfile(user);
    }
}
