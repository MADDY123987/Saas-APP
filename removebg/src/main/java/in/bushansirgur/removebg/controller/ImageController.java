package in.bushansirgur.removebg.controller;

import in.bushansirgur.removebg.response.RemoveBgResponse;
import in.bushansirgur.removebg.service.RemoveBackgroundService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Base64;

@RestController
@RequestMapping("/api/images")
@RequiredArgsConstructor
public class ImageController {

    private final RemoveBackgroundService removeBackgroundService;

    @PostMapping(
            value = "/remove-background",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.TEXT_PLAIN_VALUE
    )
    public ResponseEntity<?> removeBackground(@RequestParam("file") MultipartFile file) {
        try {
            byte[] result = removeBackgroundService.removeBackground(file);
            String base64Image = Base64.getEncoder().encodeToString(result);

            return ResponseEntity.ok()
                    .contentType(MediaType.TEXT_PLAIN)
                    .body(base64Image);

        } catch (Exception e) {
            e.printStackTrace();
            RemoveBgResponse error = RemoveBgResponse.builder()
                    .statusCode(HttpStatus.INTERNAL_SERVER_ERROR)
                    .success(false)
                    .data(e.getMessage())
                    .build();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
}
