package com.doodleCalendar.backend.modules.user;

import com.doodleCalendar.backend.modules.user.userDTO.IntervalInputDto;
import com.doodleCalendar.backend.modules.user.userDTO.UserInputDTO;
import com.doodleCalendar.backend.modules.user.userDTO.UserProfileOutputDTO;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Set;

@RestController
@RequestMapping("/user")
public class  UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile/{userId}")
    @ApiResponse(responseCode = "200", description = "Successful Operation",
            content = @Content(mediaType = "application/json",
            schema = @Schema(implementation = UserProfileOutputDTO.class)))
    public UserProfileOutputDTO getUserProfile(@PathVariable Long userId){
        return userService.getUserProfile(userId);
    }

    @PostMapping("/registration")
    @ApiResponse(responseCode = "200", description = "Successful Operation",
            content = @Content(mediaType = "application/json",
            schema = @Schema(implementation = UserProfileOutputDTO.class)))
    public UserProfileOutputDTO getUserProfile(@RequestBody UserInputDTO userInputDTO){
        return userService.createUser(userInputDTO);
    }

    @GetMapping("/free")
    public Set<UserProfileOutputDTO> getFreeUsers(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDateTime, @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDateTime) {
        return userService.getFreeUsers(startDateTime, endDateTime);
    }
}
