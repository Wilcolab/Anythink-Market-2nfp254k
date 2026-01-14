# Anythink Market Server

This is a simple Express server project that listens on port 8001. It is set up to use nodemon for automatic code reloading during development.

## Project Structure

```
anythink-market-server
├── src
│   └── server.js        # Entry point of the application
├── Dockerfile           # Dockerfile to build the server image
├── package.json         # npm configuration file
├── yarn.lock            # Yarn lock file for dependency management
└── README.md            # Project documentation
```

## Getting Started

### Prerequisites

- Node.js
- Yarn
- Docker (optional, for containerization)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/Wilcolab/Anythink-Market-2nfp254k.git
   cd anythink-market-server
   ```

2. Install dependencies:
   ```
   yarn install
   ```

### Running the Server

To start the server with automatic reloading, use the following command:

```
yarn start
```

The server will be running at `http://localhost:8001`.

### Building the Docker Image

To build the Docker image, run:

```
docker build -t anythink-market-server .
```

### Running the Docker Container

To run the Docker container, use:

```
docker run -p 8001:8001 anythink-market-server
```

The server will be accessible at `http://localhost:8001` from your host machine.

## License

This project is licensed under the MIT License.