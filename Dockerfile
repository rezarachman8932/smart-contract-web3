# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy only package files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Expose Hardhat’s default RPC port
EXPOSE 8545

# Default command (can be overridden in compose)
CMD ["npx", "hardhat", "node", "--hostname", "0.0.0.0"]