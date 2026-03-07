package com.deepfake.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VideoDTO {

    private Long id;
    private String filename;
    private Long fileSize;
    private String detectionResult;
    private Double confidenceScore;
    private String processingStatus;
    private LocalDateTime uploadedAt;
    private LocalDateTime processedAt;
}
