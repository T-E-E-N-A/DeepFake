package com.deepfake.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DetectionStatusResponse {

    private Long videoId;
    private String processingStatus;
    private String detectionResult;
    private Double confidenceScore;
    private String message;
    private Long percentageComplete;
}
