DeepFake Detection System - Backend

This is a Spring Boot application designed to authenticate users and manage video uploads for deepfake detection analysis.

## Quick Start

1. Ensure MySQL and Java 17+ are installed
2. Run: `docker-compose up -d` to start MySQL
3. Run: `mvn spring-boot:run` to start the application
4. API will be available at: http://localhost:8080/api

## Folder Layout

- `src/main/java/com/deepfake/` - Application source code
  - `controller/` - REST API endpoints
  - `service/` - Business logic
  - `repository/` - Database access
  - `model/` - JPA entities
  - `dto/` - Data transfer objects
  - `security/` - JWT and authentication
  - `config/` - Spring configuration
- `src/main/resources/` - Configuration files and SQL scripts
- `src/test/` - Unit tests
- `uploads/` - Video file storage

See `SETUP.md` for detailed setup instructions and `API.md` for endpoint documentation.
