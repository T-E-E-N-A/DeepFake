package com.deepfake.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.deepfake.dto.DetectionStatusResponse;
import com.deepfake.dto.UploadResponse;
import com.deepfake.dto.VideoDTO;
import com.deepfake.model.User;
import com.deepfake.model.Video;
import com.deepfake.service.UserService;
import com.deepfake.service.VideoService;
import com.deepfake.util.FileUtil;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/detection")
@CrossOrigin(origins = "*", maxAge = 3600)
@RequiredArgsConstructor
public class DetectionController {

    private final VideoService videoService;
    private final UserService userService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadVideo(@RequestParam("file") MultipartFile file) {
        try {
            // Validate file
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("File is empty");
            }

            if (!FileUtil.isValidVideoFile(file.getOriginalFilename())) {
                return ResponseEntity.badRequest().body("Invalid file type. Only video files are allowed.");
            }

            if (!FileUtil.isFileSizeValid(file.getSize())) {
                return ResponseEntity.badRequest().body("File size exceeds the maximum limit of 100MB.");
            }

            // Get current user
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            User user = userService.getUserByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));

            // Generate unique filename and save file
            String uniqueFilename = FileUtil.generateUniqueFilename(file.getOriginalFilename());
            String uploadDir = FileUtil.getUploadDirectory();
            Path filePath = Paths.get(uploadDir, uniqueFilename);
            Files.write(filePath, file.getBytes());

            // Create video record
            Video video = new Video();
            video.setFilename(uniqueFilename);
            video.setFilePath(filePath.toString());
            video.setFileSize(file.getSize());
            video.setUser(user);
            video.setProcessingStatus("PENDING");

            Video savedVideo = videoService.saveVideo(video);

            UploadResponse response = new UploadResponse(
                savedVideo.getId(),
                savedVideo.getFilename(),
                "Video uploaded successfully",
                savedVideo.getProcessingStatus(),
                savedVideo.getUploadedAt().toEpochSecond(java.time.ZoneOffset.UTC) * 1000
            );

            return ResponseEntity.ok(response);

        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Failed to upload file: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/status/{videoId}")
    public ResponseEntity<?> getDetectionStatus(@PathVariable Long videoId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userService.getUserByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));

        Video video = videoService.getVideoById(videoId).orElse(null);
        if (video == null || !video.getUser().getId().equals(user.getId())) {
            return ResponseEntity.notFound().build();
        }

        // For now, simulate processing completion after some time
        // In real implementation, this would check actual processing status
        if ("PENDING".equals(video.getProcessingStatus())) {
            // Simulate processing
            video.setProcessingStatus("COMPLETED");
            video.setDetectionResult("REAL"); // Placeholder
            video.setConfidenceScore(0.95);
            video.setProcessedAt(LocalDateTime.now());
            videoService.updateVideo(video);
        }

        DetectionStatusResponse response = new DetectionStatusResponse(
            video.getId(),
            video.getProcessingStatus(),
            video.getDetectionResult(),
            video.getConfidenceScore(),
            "Analysis completed",
            100L
        );

        return ResponseEntity.ok(response);
    }

    @GetMapping("/history")
    public ResponseEntity<?> getDetectionHistory() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userService.getUserByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));

        List<Video> videos = videoService.getUserVideos(user.getId());
        List<VideoDTO> videoDTOs = new ArrayList<>();
        for (Video video : videos) {
            VideoDTO dto = new VideoDTO(
                video.getId(),
                video.getFilename(),
                video.getFileSize(),
                video.getDetectionResult(),
                video.getConfidenceScore(),
                video.getProcessingStatus(),
                video.getUploadedAt(),
                video.getProcessedAt()
            );
            videoDTOs.add(dto);
        }

        return ResponseEntity.ok(videoDTOs);
    }
}
