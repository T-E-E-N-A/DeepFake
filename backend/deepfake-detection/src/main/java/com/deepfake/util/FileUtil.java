package com.deepfake.util;

import java.io.File;
import java.nio.file.Paths;

public class FileUtil {

    private static final long MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

    public static boolean isValidVideoFile(String filename) {
        String[] validExtensions = {".mp4", ".avi", ".mov", ".mkv", ".flv", ".wmv", ".webm"};
        for (String extension : validExtensions) {
            if (filename.toLowerCase().endsWith(extension)) {
                return true;
            }
        }
        return false;
    }

    public static boolean isFileSizeValid(long fileSize) {
        return fileSize > 0 && fileSize <= MAX_FILE_SIZE;
    }

    public static String generateUniqueFilename(String originalFilename) {
        String timestamp = System.currentTimeMillis() + "_";
        return timestamp + originalFilename;
    }

    public static String getUploadDirectory() {
        String uploadPath = "./uploads";
        File uploadDir = new File(uploadPath);
        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
        }
        return uploadPath;
    }
}
