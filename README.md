# Anythink Market Backend Services

This project contains backend implementations for the Anythink Market application, featuring a complete migration from Python (FastAPI) to Node.js (Express).

## 🎯 Project Overview

**MLH WILCO Quest**: Backend Migration from Python to Node.js

This repository demonstrates a complete backend migration from Python/FastAPI to Node.js/Express, showcasing best practices in modern web API development, including:

- ✅ MVC (Model-View-Controller) architecture
- ✅ Comprehensive testing with 87.87% coverage
- ✅ Production-ready Docker containerization
- ✅ Full API parity between implementations
- ✅ Extensive documentation and code comments
- ✅ Environment-based configuration

## 📚 Documentation Structure

- [Main README](README.md) - This file, project overview
- [Node.js Server Documentation](node-server/README.md) - Complete Node.js implementation guide
- [Environment Variables Guide](node-server/ENVIRONMENT.md) - Configuration documentation
- [Testing Documentation](node-server/TESTING.md) - How to run and write tests
- [Migration Summary](QUEST_COMPLETE.md) - Quest completion details

## 📦 Available Services

### 1. Python Server (Original Implementation)
A FastAPI server implementation providing task management endpoints.

**Location**: `python-server/`

**Technology Stack**:
- Python 3.9
- FastAPI (modern web framework)
- Uvicorn (ASGI server)

**Port**: 8000 (Docker)

**API Endpoints**:
- `GET /` - Health check endpoint
- `GET /tasks` - Retrieve all tasks
- `POST /tasks` - Add a new task

### 2. Node.js Server (New Implementation)
A complete Node.js/Express implementation with MVC architecture and production-ready features.

**Location**: `node-server/`

**Technology Stack**:
- Node.js 18+ (LTS)
- Express.js 4.18+ (web framework)
- Jest 29+ (testing framework)
- Supertest (API testing)
- Docker (containerization)

**Port**: 8001 (Docker), 8000 (local development)

**Features**:
- MVC architecture (Models, Controllers, Routes)
- 15 automated tests with 87.87% coverage
- JSDoc-style code documentation
- Environment-based configuration
- Production + development Docker images
- Request logging and error handling
- CORS support

**API Endpoints** (100% parity with Python server):
- `GET /` - Health check endpoint
- `GET /tasks` - Retrieve all tasks
- `POST /tasks` - Add a new task

See [node-server/README.md](node-server/README.md) for complete documentation.

## 🔄 Migration Details

### Migration Approach

The migration from Python/FastAPI to Node.js/Express was designed to:

1. **Maintain API Compatibility**: All endpoints return identical responses
2. **Improve Architecture**: Implemented proper MVC separation
3. **Add Testing**: 87.87% test coverage with 15 automated tests
4. **Enhance Documentation**: Comprehensive inline comments and guides
5. **Production Ready**: Docker support with proper configuration

### Key Differences

| Aspect | Python Implementation | Node.js Implementation |
|--------|----------------------|------------------------|
| **Architecture** | Single-file | MVC (Models, Controllers, Routes, Config) |
| **Lines of Code** | ~25 lines | ~300 lines (with tests) |
| **Testing** | No tests | 15 tests, 87.87% coverage |
| **Documentation** | Basic comments | JSDoc-style comprehensive docs |
| **Configuration** | Inline | Centralized config module |
| **Docker** | Single Dockerfile | Production + Development images |
| **Error Handling** | Basic | Comprehensive with logging |

### Migration Benefits

✅ **Better Structure**: MVC pattern makes code maintainable and scalable  
✅ **Testability**: Comprehensive test suite ensures reliability  
✅ **Documentation**: Well-documented code aids onboarding and maintenance  
✅ **Flexibility**: Modular design allows easy feature additions  
✅ **Industry Standard**: Node.js/Express is widely adopted for APIs  

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose installed
- Node.js 18+ and npm (for local Node.js development)
- Python 3.9+ (for local Python development)

### Running with Docker Compose (Recommended)

Start both servers simultaneously:

```bash
# Start both servers
docker compose up

# Or start individually
docker compose up python-server  # Python server on port 8000
docker compose up node-server    # Node.js server on port 8001

# Start Node.js server
docker compose up node-server

# Start both servers
docker compose up
```

**Access Points**:
- Python Server: http://localhost:8000
- Node.js Server: http://localhost:8001

### Running Locally

**Python Server**:
```bash
cd python-server
pip install -r requirements.txt
uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
```

**Node.js Server**:
```bash
cd node-server
npm install
npm run dev
```

## 📡 API Endpoints

Both implementations provide the same API endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check - returns "Hello World" |
| GET | `/tasks` | Retrieve all tasks |
| POST | `/tasks` | Add a new task |

### Example Usage

```bash
# Health check
curl http://localhost:8000/

# Get all tasks
curl http://localhost:8000/tasks

# Add a new task
curl -X POST http://localhost:8000/tasks \
  -H "Content-Type: application/json" \
  -d '{"text": "My new task"}'
```

## 🧪 Testing

### Node.js Server (Comprehensive Testing)

```bash
cd node-server

# Run automated tests
npm test

# Run with coverage
npm test -- --coverage

# Import Postman collection
# File: postman_collection.json
```

See [node-server/TESTING.md](node-server/TESTING.md) for detailed testing instructions.

### Python Server

```bash
# Test with curl
curl http://localhost:8000/tasks
```

## 🏗️ Project Structure

```
Anythink-Market/
├── python-server/          # Original Python/FastAPI implementation
│   ├── src/
│   │   ├── __init__.py
│   │   └── main.py
│   ├── Dockerfile
│   └── requirements.txt
│
├── node-server/           # New Node.js/Express implementation
│   ├── src/
│   │   ├── config/       # Configuration files
│   │   ├── controllers/  # Request handlers
│   │   ├── models/       # Data models
│   │   ├── routes/       # API routes
│   │   └── index.js      # Entry point
│   ├── __tests__/        # Jest test files
│   ├── Dockerfile        # Production build
│   ├── Dockerfile.dev    # Development build
│   ├── package.json
│   ├── TESTING.md
│   └── README.md
│
├── docker-compose.yml    # Multi-container orchestration
└── README.md            # This file
```

## 🔄 Migration Highlights

### Python to Node.js Feature Parity

| Feature | Python (FastAPI) | Node.js (Express) |
|---------|------------------|-------------------|
| Framework | FastAPI | Express.js |
| Validation | Pydantic | Manual + middleware |
| Testing | None | Jest + Supertest (15+ tests) |
| Structure | Single file | MVC architecture |
| Documentation | Basic | Comprehensive |
| Docker | Single Dockerfile | Dev + Prod Dockerfiles |

### Node.js Improvements

✅ **Better Structure**: MVC architecture with separated concerns  
✅ **Comprehensive Testing**: Unit + integration tests with coverage  
✅ **Production Ready**: Error handling, logging, monitoring  
✅ **Development Experience**: Hot-reload, better debugging  
✅ **Documentation**: Detailed README, testing guide, Postman collection  
✅ **Best Practices**: Following Node.js and Express.js standards  

## 🛠️ Development Workflow

### Making Changes

**Node.js (with hot-reload)**:
```bash
docker compose up node-server
# Edit files in node-server/src/
# Server automatically restarts
```

**Python (with hot-reload)**:
```bash
docker compose up python-server
# Edit files in python-server/src/
# Server automatically restarts
```

## 🐳 Docker Configuration

### Services Defined

```yaml
python-server:
  - Port: 8000:8000
  - Hot-reload enabled
  - Volume mounted: ./python-server/src:/app/src

node-server:
  - Port: 8001:8000
  - Hot-reload enabled (Dockerfile.dev)
  - Volume mounted: ./node-server/src:/app/src
  - Node modules cached in container
```

### Docker Commands

```bash
# Build and start services
docker compose up --build

# Stop services
docker compose down

# View logs
docker compose logs -f node-server

# Rebuild specific service
docker compose build node-server
```

## 📚 Documentation

- **Main README**: You are here
- **Node.js Server**: [node-server/README.md](node-server/README.md)
- **Testing Guide**: [node-server/TESTING.md](node-server/TESTING.md)
- **Postman Collection**: [node-server/postman_collection.json](node-server/postman_collection.json)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Add/update tests
4. Update documentation
5. Submit a pull request

## 📄 License

MIT License

## 👥 Authors

Anythink Market Team - MLH WILCO Quest

---

**Note**: This project is part of the MLH WILCO "Upgrade Backend" quest, demonstrating a complete migration from Python/FastAPI to Node.js/Express while maintaining functionality and adding modern best practices.
