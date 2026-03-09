# DeepFake Detection System - Setup Guide

## Prerequisites
- Java 17 or higher
- Maven 3.8.0 or higher
- MySQL 8.0 or higher
- Docker (optional, for running MySQL in container)

## Project Structure Overview

### Core Application
- **Entities**: User and Video models stored in MySQL
- **Controllers**: RESTful API endpoints for authentication and video detection
- **Services**: Business logic for user and video management
- **Security**: JWT-based authentication with Spring Security

### Database Tables
- **users**: Stores user account information with role-based access
- **videos**: Stores uploaded video metadata and detection results

## Setup Instructions

### 1. Database Setup

#### Option A: Using Docker Compose (Recommended)
```bash
docker-compose up -d
```
This will start MySQL automatically with the required database and tables.

#### Option B: Manual MySQL Setup
```sql
CREATE DATABASE deepfake_db;
CREATE USER 'deepfake_user'@'localhost' IDENTIFIED BY 'deepfake_password';
GRANT ALL PRIVILEGES ON deepfake_db.* TO 'deepfake_user'@'localhost';
FLUSH PRIVILEGES;
```

### 2. Application Configuration

Update `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/deepfake_db
spring.datasource.username=deepfake_user
spring.datasource.password=deepfake_password
jwt.secret=your_secret_key_here_change_in_production
```

### 3. Build and Run

#### Build the Project
```bash
mvn clean install
```

#### Run the Application
```bash
mvn spring-boot:run
```

The application will start on `http://localhost:8080/api`

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Video Detection
- `POST /api/detection/upload` - Upload video for detection
- `GET /api/detection/status/{videoId}` - Check detection status
- `GET /api/detection/history` - Get detection history

## Development Notes

### Key Packages
- `controller`: API endpoints
- `service`: Business logic and operations
- `repository`: Database access layer
- `model`: Entity classes
- `dto`: Data transfer objects for API requests/responses
- `security`: JWT and authentication configuration
- `config`: Spring configuration classes
- `exception`: Global exception handling
- `util`: Utility functions

### File Upload
- Maximum file size: 100MB
- Supported formats: MP4, AVI, MOV, MKV, FLV, WMV, WebM
- Upload directory: `./uploads/`

## Testing

Run tests with:
```bash
mvn test
```

## Troubleshooting

### MySQL Connection Issues
- Ensure MySQL is running on port 3306
- Verify database credentials in application.properties
- Check database URL is correct

### JWT Token Issues
- Change the `jwt.secret` in application.properties to a secure value
- Token expiration is set to 24 hours by default

### File Upload Issues
- Ensure `uploads/` directory exists and is writable
- Check file size doesn't exceed 100MB limit
- Verify file extension is in supported formats
