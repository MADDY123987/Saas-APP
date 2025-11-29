package in.bushansirgur.removebg.controller;

import in.bushansirgur.removebg.dto.UserDTO;
import in.bushansirgur.removebg.response.RemoveBgResponse;
import in.bushansirgur.removebg.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<?> createOrUpdateUser(@RequestBody UserDTO userDTO) {
        try {
            UserDTO savedUser = userService.saveUser(userDTO);

            return ResponseEntity.ok(
                    RemoveBgResponse.builder()
                            .success(true)
                            .statusCode(HttpStatus.OK)
                            .data(savedUser)
                            .build()
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    RemoveBgResponse.builder()
                            .success(false)
                            .statusCode(HttpStatus.INTERNAL_SERVER_ERROR)
                            .data(e.getMessage())
                            .build()
            );
        }
    }

    @GetMapping("/credits")
    public ResponseEntity<?> getUserCredits(@RequestParam String clerkId) {
        try {
            UserDTO user = userService.getUserByClerkId(clerkId);

            Map<String, Integer> map = new HashMap<>();
            map.put("credits", user.getCredits());

            return ResponseEntity.ok(
                    RemoveBgResponse.builder()
                            .success(true)
                            .statusCode(HttpStatus.OK)
                            .data(map)
                            .build()
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    RemoveBgResponse.builder()
                            .success(false)
                            .statusCode(HttpStatus.INTERNAL_SERVER_ERROR)
                            .data("Something went wrong.")
                            .build()
            );
        }
    }
}
