# DeepFake Detection System

## Project Structure

```
DeepFake/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/deepfake/
│   │   │       ├── controller/
│   │   │       │   ├── DetectionController.java       # Video detection endpoints
│   │   │       │   └── AuthController.java            # Authentication endpoints
│   │   │       ├── service/
│   │   │       │   ├── VideoService.java              # Video business logic
│   │   │       │   ├── UserService.java               # User business logic
│   │   │       │   └── CustomUserDetailsService.java  # Spring Security integration
│   │   │       ├── repository/
│   │   │       │   ├── VideoRepository.java           # Video data access
│   │   │       │   └── UserRepository.java            # User data access
│   │   │       ├── model/
│   │   │       │   ├── User.java                      # User entity
│   │   │       │   └── Video.java                     # Video entity
│   │   │       ├── dto/
│   │   │       │   ├── LoginRequest.java              # Login request DTO
│   │   │       │   └── AuthResponse.java              # Authentication response DTO
│   │   │       ├── security/
│   │   │       │   ├── JwtTokenProvider.java          # JWT token generation & validation
│   │   │       │   └── JwtAuthenticationFilter.java   # JWT authentication filter
│   │   │       ├── config/
│   │   │       │   ├── SecurityConfig.java            # Spring Security configuration
│   │   │       │   └── CorsConfig.java                # CORS configuration
│   │   │       ├── exception/
│   │   │       │   └── GlobalExceptionHandler.java    # Global exception handling
│   │   │       ├── util/
│   │   │       │   └── FileUtil.java                  # File utility functions
│   │   │       └── DeepFakeApplication.java           # Main application entry point
│   │   └── resources/
│   │       ├── application.properties                 # Application configuration
│   │       └── application-dev.properties             # Development configuration
│   └── test/
│       └── java/
│           └── com/deepfake/
│               └── DeepFakeApplicationTests.java      # Application tests
├── uploads/                           # Video uploads directory
├── .mvn/wrapper/                      # Maven wrapper
├── pom.xml                            # Maven configuration
├── .gitignore                         # Git ignore rules
└── README.md                          # This file

```

## Problem Statement
With the rapid growth of digital media platforms, videos have become one of the most influential sources of information sharing. However, deepfake technology has made it easy to create fake videos that appear highly realistic. These are often misused to spread misinformation, manipulate public opinion, defame individuals, and create social unrest.

Currently, there is no effective real-time verification mechanism to:
- Detect manipulated videos
- Provide secure backend support for video data management

This project aims to solve these challenges by building a **secure, scalable, and efficient backend-driven solution using Spring Boot**.

---

## Objectives
- Develop a system to detect fake/manipulated videos using automated analysis.
- Provide **real-time verification** during video upload.
- Build a secure backend with **Spring Boot** for video processing and storage.
- Support awareness and control of digital misinformation.

---

## Scope
- Video upload and secure storage
- Metadata extraction and analysis
- Verification result generation (real, suspicious, fake)
- Secure backend architecture
- Future extensions: AI models, frontend dashboards, large-scale deployment

---

### Software
- **Backend Framework:** Spring Boot  
- **Language:** Java  
- **Database:** MySQL  
- **Authentication:** JWT  
- **Build Tool:** Maven  
- **API Testing:** Postman  
- **IDE:** IntelliJ IDEA  

---

## Resources & Limitations

### Resources
- Video datasets for testing  
- Metadata extraction libraries  
- Backend development tools  

### Limitations
- May not detect all advanced deepfake techniques  
- Large video files increase processing time  
- Focused mainly on backend logic (limited frontend)  

---

## ✅ Conclusion
The **Fake Video Tracing and Verification System** provides a practical solution to combat digital misinformation. By leveraging **Spring Boot** for secure backend processing, the system ensures reliable video verification and traceability. With further enhancements, it can significantly contribute to building trust in digital media platforms.
3. [Spring Boot Documentation](https://spring.io/projects/spring-boot)  
4. [Java Platform Documentation](https://docs.oracle.com/javase/)  
