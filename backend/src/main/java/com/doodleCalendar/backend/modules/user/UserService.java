package com.doodleCalendar.backend.modules.user;

import com.doodleCalendar.backend.exception.types.NoSuchUserException;
import com.doodleCalendar.backend.modules.user.userDTO.IntervalInputDto;
import com.doodleCalendar.backend.modules.user.userDTO.UserInputDTO;
import com.doodleCalendar.backend.modules.user.userDTO.UserProfileOutputDTO;
import com.doodleCalendar.backend.utils.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

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

    public Set<UserProfileOutputDTO> getFreeUsers(LocalDateTime startDateTime, LocalDateTime endDateTime) {
        // todo: здесь сейчас наивный алгоритм заглушка, поменяю
        var users = userRepository.findAll();
        Set<User> freeUsers = new HashSet<>();

        for (var user: users) {
            if (user.isBusyDuring(startDateTime, endDateTime)) {
                freeUsers.add(user);
            }
        }

        return freeUsers.stream().map(user -> userMapper.userToUserProfile(user)).collect(Collectors.toSet());

        // 1.) naive algorithm:
        // for each user:
        //  if (user.isBusyDuring(intervalInputDto)) -> count user in

        // Implementations:

        // 1. Load all users -> iterate and load all busyensses for every user
        // Time O(n^2), (n + 1) different queries O(n) querying complexity!

        // 2. Load all users and for each user load all his busynesses in one query using join
        // Then we need to filter users to take only those for whom every joined
        // busyness is ok (easier to exclude rows that are not ok)
        // We also need to select distinct user rows
        // Time O(n^2), 1 query, O(1) querying complexity

        // 3. Do as in part 2, but also create an B-tree index for dates fields in busyness intervals
        // Time (n*log(n)), 1 query O(1) querying complexity

        // 2.) something more interesting

        // Use the idea of 1.) but also cache free days for every user (new collection with hash index on date)
        // when we select all users we exclude all users that are free on the days the interval lasts
        // It appears easier to cache busy days (days, when at least some time is busy), and then if no rows found
        // for a day -> then the day is free )
        // Assuming we have a lot of users, and a lot of users may have nothing at the day we are requesting
        // Time O(n + m*log(n)), m << n, 1 query O(1) querying complexity




    }
}
