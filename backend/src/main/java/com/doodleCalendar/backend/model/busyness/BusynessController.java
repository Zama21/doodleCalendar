package com.doodleCalendar.backend.model.busyness;

import com.doodleCalendar.backend.model.busyness.busynessDTO.OneTimeBusynessInputDTO;
import com.doodleCalendar.backend.model.busyness.busynessDTO.OneTimeBusynessOutputDTO;
import com.doodleCalendar.backend.model.busyness.busynessDTO.RepeatsBusynessInputDTO;
import com.doodleCalendar.backend.model.busyness.busynessDTO.RepeatsBusynessOutputDTO;
import com.doodleCalendar.backend.model.user.userDTO.UserProfileOutputDTO;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/busyness")
public class BusynessController {

    @Autowired
    private BusynessService busynessService;

    @GetMapping("/get-on-time/{userId}")
    @ApiResponse(responseCode = "200", description = "Successful Operation",
            content = @Content(mediaType = "application/json",
            array = @ArraySchema(schema = @Schema(implementation = OneTimeBusynessOutputDTO.class))))
    public List<OneTimeBusynessOutputDTO> getNoRepeatsBusyness(@PathVariable Long userId){
        return busynessService.getNoRepeatsBusyness(userId);
    }

    @GetMapping("/get-repeats/{userId}")
    @ApiResponse(responseCode = "200", description = "Successful Operation",
            content = @Content(mediaType = "application/json",
            array = @ArraySchema(schema = @Schema(implementation = RepeatsBusynessOutputDTO.class))))
    public List<RepeatsBusynessOutputDTO> getRepeatsBusyness(@PathVariable Long userId){
        return busynessService.getRepeatsBusyness(userId);
    }

    @PostMapping("/post-one-time/{userId}")
    @ApiResponse(responseCode = "200", description = "Successful Operation",
            content = @Content(mediaType = "application/json",
            array = @ArraySchema(schema = @Schema(implementation = OneTimeBusynessOutputDTO.class))))
    public List<OneTimeBusynessOutputDTO> createOneTimeBusyness(
            @PathVariable Long userId, @RequestBody List<OneTimeBusynessInputDTO> busynessInputDTO){
        return busynessService.createOneTimesBusyness(busynessInputDTO);
    }

    @PostMapping("/post-repeat/{userId}")
    @ApiResponse(responseCode = "200", description = "Successful Operation",
            content = @Content(mediaType = "application/json",
            array = @ArraySchema(schema = @Schema(implementation = RepeatsBusynessOutputDTO.class))))
    public List<RepeatsBusynessOutputDTO> createRepeatsBusyness(
            @PathVariable Long userId, @RequestBody List<RepeatsBusynessInputDTO> busynessInputDTO){
        return busynessService.createRepeatsBusyness(busynessInputDTO);
    }
}
