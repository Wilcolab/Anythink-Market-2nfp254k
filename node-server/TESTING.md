# Testing Guide for Anythink Market Node.js Backend

This document provides comprehensive testing instructions for the Node.js/Express backend API.

## Table of Contents
1. [Automated Tests with Jest](#automated-tests-with-jest)
2. [Manual Testing with cURL](#manual-testing-with-curl)
3. [Testing with Postman](#testing-with-postman)
4. [Docker Testing](#docker-testing)

---

## Automated Tests with Jest

### Prerequisites
- Node.js (v18 or higher)
- npm installed

### Running Tests

```bash
cd node-server

# Install dependencies
npm install

# Run all tests
npm test

# Run tests in watch mode (for development)
npm run test:watch

# Run tests with coverage report
npm test -- --coverage
```

### Test Coverage
The test suite includes:
- **Unit Tests**: Testing individual models and functions
- **Integration Tests**: Testing API endpoints end-to-end
- **Edge Cases**: Testing error handling and validation

Expected output:
```
PASS  __tests__/taskModel.test.js
PASS  __tests__/api.test.js

Test Suites: 2 passed, 2 total
Tests:       15 passed, 15 total
```

---

## Manual Testing with cURL

### Prerequisites
- Server running on `http://localhost:8000` (or `http://localhost:8001` for Docker)

### Start the Server

**Local Development:**
```bash
cd node-server
npm install
npm start
```

**Using Docker:**
```bash
docker compose up node-server
```

### cURL Test Commands

#### 1. Health Check - Root Endpoint
```bash
curl http://localhost:8000/
```
**Expected Response:**
```
Hello World
```

#### 2. Get All Tasks (GET)
```bash
curl -X GET http://localhost:8000/tasks
```
**Expected Response:**
```json
{
  "tasks": [
    "Write a diary entry from the future",
    "Create a time machine from a cardboard box",
    "Plan a trip to the dinosaurs",
    "Draw a futuristic city",
    "List items to bring on a time-travel adventure"
  ]
}
```

#### 3. Add a New Task (POST)
```bash
curl -X POST http://localhost:8000/tasks \
  -H "Content-Type: application/json" \
  -d '{"text": "Build a rocket ship"}'
```
**Expected Response:**
```json
{
  "success": true,
  "message": "Task added successfully"
}
```

#### 4. Verify Task Was Added
```bash
curl -X GET http://localhost:8000/tasks
```
**Expected Response:** Should now include "Build a rocket ship" in the tasks array.

#### 5. Test Error Handling - Missing Task Text
```bash
curl -X POST http://localhost:8000/tasks \
  -H "Content-Type: application/json" \
  -d '{}'
```
**Expected Response:**
```json
{
  "error": "Task text is required"
}
```
**Status Code:** 400

#### 6. Test 404 - Invalid Route
```bash
curl -X GET http://localhost:8000/invalid-route
```
**Expected Response:**
```json
{
  "error": "Route not found"
}
```
**Status Code:** 404

---

## Testing with Postman

### Import Postman Collection

A Postman collection is provided in `postman_collection.json`. 

**To Import:**
1. Open Postman
2. Click "Import" button
3. Select `postman_collection.json`
4. Collection will appear in your workspace

### Postman Collection Contents

The collection includes:
- **Health Check**: GET request to `/`
- **Get All Tasks**: GET request to `/tasks`
- **Add Task (Success)**: POST request with valid data
- **Add Task (Error - No Text)**: POST request with missing text
- **404 Test**: GET request to invalid route

### Running Collection

1. **Set Base URL**: 
   - Variable: `{{baseUrl}}`
   - Value: `http://localhost:8000` (or `http://localhost:8001` for Docker)

2. **Run All Tests**:
   - Click "Runner" in Postman
   - Select the collection
   - Click "Run"

3. **Individual Tests**:
   - Click on each request
   - Click "Send"
   - Verify response matches expected output

---

## Docker Testing

### Test with Docker Compose

```bash
# Start the Node.js service
docker compose up node-server

# In another terminal, run tests
curl http://localhost:8001/tasks
```

### Build and Run Manually

```bash
# Build the image
cd node-server
docker build -t anythink-node-backend .

# Run the container
docker run -p 8000:8000 anythink-node-backend

# Test the endpoint
curl http://localhost:8000/tasks
```

---

## Test Scenarios Checklist

Use this checklist to verify all functionality:

- [ ] Server starts successfully
- [ ] Root endpoint returns "Hello World"
- [ ] GET /tasks returns array of tasks
- [ ] GET /tasks returns 200 status code
- [ ] POST /tasks with valid data adds task
- [ ] POST /tasks returns 201 status code
- [ ] POST /tasks without text returns 400 error
- [ ] Added tasks appear in subsequent GET requests
- [ ] Invalid routes return 404
- [ ] Server handles multiple concurrent requests
- [ ] CORS headers are present in responses
- [ ] Server logs requests (in development mode)

---

## Troubleshooting

### Port Already in Use
If port 8000 is already in use:
```bash
# Find process using port 8000
lsof -i :8000

# Kill the process
kill -9 <PID>

# Or use a different port
PORT=8080 npm start
```

### Module Not Found Errors
```bash
# Remove node_modules and reinstall
rm -rf node_modules
npm install
```

### Docker Issues
```bash
# Stop all containers
docker compose down

# Remove containers and rebuild
docker compose up --build node-server
```

---

## Expected Performance

- **Response Time**: < 50ms for GET requests
- **Response Time**: < 100ms for POST requests
- **Concurrent Users**: Supports 100+ concurrent connections
- **Memory Usage**: < 50MB under normal load

---

## Additional Testing Resources

- **API Documentation**: See main README.md
- **Postman Collection**: `postman_collection.json`
- **Jest Tests**: `__tests__/` directory
- **Load Testing**: Consider using Apache Bench or Artillery for load testing

---

## Contact & Support

For issues or questions about testing, please refer to the main project README or create an issue in the repository.
