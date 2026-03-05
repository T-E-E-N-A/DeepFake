package com.deepfake.service;

import com.deepfake.model.Video;
import com.deepfake.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VideoService {

    private final VideoRepository videoRepository;

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
}
