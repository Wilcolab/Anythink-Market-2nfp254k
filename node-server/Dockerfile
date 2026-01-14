# Use the official Node.js LTS (Long Term Support) base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the application source code
COPY src/ ./src/

# Expose the port on which the server will run
EXPOSE 8000

# Set environment to production
ENV NODE_ENV=production

# Set the command to run the server
CMD ["npm", "start"]
