package com.deepfake.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UploadResponse {

    private Long id;
    private String filename;
    private String message;
    private String processingStatus;
    private Long uploadedTimestamp;
}
