package com.deepfake.service;

import com.deepfake.dto.UploadResponse;
import com.deepfake.model.User;
import com.deepfake.model.Video;
import com.deepfake.repository.VideoRepository;
import com.deepfake.util.FileUtil;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import lombok.RequiredArgsConstructor;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VideoService {

    private final VideoRepository videoRepository;

    public VideoService(VideoRepository videoRepository) {
        this.videoRepository = videoRepository;
    }

    public Video saveVideo(Video video) {
        return videoRepository.save(video);
    }

    public Optional<Video> getVideoById(Long id) {
        return videoRepository.findById(id);
    }

    public List<Video> getUserVideos(Long userId) {
        return videoRepository.findByUserIdOrderByUploadedAtDesc(userId);
    }

    public Video updateVideo(Video video) {
        return videoRepository.save(video);
    }

    public void deleteVideo(Long id) {
        videoRepository.deleteById(id);
    }

    public List<Video> getAllVideos() {
        return videoRepository.findAll();
    }

    public UploadResponse uploadVideo(MultipartFile file, User user) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("No file provided");
        }

        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null || !FileUtil.isValidVideoFile(originalFilename)) {
            throw new IllegalArgumentException("Invalid video format");
        }

        if (!FileUtil.isFileSizeValid(file.getSize())) {
            throw new IllegalArgumentException("File size exceeds limit");
        }

        String uniqueFilename = FileUtil.generateUniqueFilename(originalFilename);
        String uploadDir = FileUtil.getUploadDirectory();
        Path destinationPath = Paths.get(uploadDir, uniqueFilename);

        try {
            file.transferTo(destinationPath.toFile());
        } catch (IOException e) {
            throw new RuntimeException("Failed to save file", e);
        }

        Video video = new Video();
        video.setFilename(uniqueFilename);
        video.setFilePath(destinationPath.toAbsolutePath().toString());
        video.setFileSize(file.getSize());
        video.setUser(user);
        video.setProcessingStatus("PENDING");

        Video savedVideo = videoRepository.save(video);

        Long uploadedTimestamp = savedVideo.getUploadedAt() != null
                ? savedVideo.getUploadedAt().atZone(ZoneId.systemDefault()).toInstant().toEpochMilli()
                : null;

        return new UploadResponse(
                savedVideo.getId(),
                savedVideo.getFilename(),
                "Video uploaded successfully",
                savedVideo.getProcessingStatus(),
                uploadedTimestamp
        );
    }
}

