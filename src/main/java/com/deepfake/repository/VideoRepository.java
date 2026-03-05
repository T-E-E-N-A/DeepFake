package com.deepfake.repository;

import com.deepfake.model.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VideoRepository extends JpaRepository<Video, Long> {
    List<Video> findByUserId(Long userId);

    List<Video> findByUserIdOrderByUploadedAtDesc(Long userId);
}
