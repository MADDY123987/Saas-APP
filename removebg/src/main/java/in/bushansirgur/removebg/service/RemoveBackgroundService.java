package in.bushansirgur.removebg.service;

import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

public interface RemoveBackgroundService {
    byte[] removeBackground(MultipartFile file) throws IOException;
}
