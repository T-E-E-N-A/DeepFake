package com.deepfake.controller;

import com.deepfake.dto.UploadResponse;
import com.deepfake.model.User;
import com.deepfake.service.VideoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/detection")
@CrossOrigin(origins = "*", maxAge = 3600)
public class DetectionController {

    private final VideoService videoService;

    public DetectionController(VideoService videoService) {
        this.videoService = videoService;
    }

    @PostMapping(
            value = "/upload",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<UploadResponse> uploadVideo(
            @RequestParam("file") MultipartFile file,
            Authentication authentication
    ) {
        User user = (User) authentication.getPrincipal();
        UploadResponse response = videoService.uploadVideo(file, user);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // TODO: Implement detection status endpoint
    // TODO: Implement detection history endpoint
}

