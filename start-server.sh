#!/bin/bash
# Startup script for Node.js server in CI/CD environment

set -e

echo "Starting Node.js server..."
cd node-server

# Install dependencies if not already installed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Start the server in background
echo "Starting server on port 8000..."
PORT=8000 npm start &
SERVER_PID=$!

# Wait for server to be ready
echo "Waiting for server to be ready..."
for i in {1..30}; do
  if curl -s http://localhost:8000/ > /dev/null 2>&1; then
    echo "✓ Server is ready!"
    wait $SERVER_PID
    exit 0
  fi
  echo "Attempt $i/30: Waiting for server..."
  sleep 1
done

echo "✗ Server failed to start"
kill $SERVER_PID 2>/dev/null || true
exit 1
