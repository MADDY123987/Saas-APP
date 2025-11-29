package in.bushansirgur.removebg.service.impl;

import in.bushansirgur.removebg.service.RemoveBackgroundService;
import lombok.RequiredArgsConstructor;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class RemoveBackgroundServiceImpl implements RemoveBackgroundService {

    @Value("${clipdrop.api.key}")
    private String apiKey;

    private static final String CLIPDROP_URL = "https://clipdrop-api.co/remove-background/v1";

    @Override
    public byte[] removeBackground(MultipartFile file) throws IOException {

        if (file == null || file.isEmpty()) {
            throw new IOException("Uploaded file is empty!");
        }

        OkHttpClient client = new OkHttpClient();

        String contentType = file.getContentType() != null && !file.getContentType().isBlank()
                ? file.getContentType()
                : "image/jpeg"; // default fallback

        RequestBody imageBody = RequestBody.create(
                file.getBytes(),
                MediaType.parse(contentType)
        );

        MultipartBody requestBody = new MultipartBody.Builder()
                .setType(MultipartBody.FORM)
                .addFormDataPart("image_file", file.getOriginalFilename(), imageBody)
                .build();

        Request request = new Request.Builder()
                .url(CLIPDROP_URL)
                .addHeader("x-api-key", apiKey)
                .post(requestBody)
                .build();

        try (Response response = client.newCall(request).execute()) {

            if (!response.isSuccessful()) {
                String errorDetails = response.body() != null ? response.body().string() : "No error details";
                throw new IOException("ClipDrop failed: " + response.code() + " | " + errorDetails);
            }

            return Objects.requireNonNull(response.body()).bytes();
        }
    }
}
