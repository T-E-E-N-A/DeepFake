package com.deepfake.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "videos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Video {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String filename;

    @Column(nullable = false)
    private String filePath;

    @Column(nullable = false)
    private Long fileSize;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "detection_result")
    private String detectionResult; // REAL, SUSPICIOUS, FAKE

    @Column(columnDefinition = "LONGTEXT")
    private String metadata;

    @Column(columnDefinition = "LONGTEXT")
    private String analysisData;

    @Column(name = "confidence_score")
    private Double confidenceScore;

    @Column(name = "processing_status")
    private String processingStatus = "PENDING"; // PENDING, PROCESSING, COMPLETED, FAILED

    @Column(name = "uploaded_at")
    private LocalDateTime uploadedAt = LocalDateTime.now();

    @Column(name = "processed_at")
    private LocalDateTime processedAt;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}
