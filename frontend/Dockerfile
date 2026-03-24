# Build stage
FROM node:18-slim as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Production stage
FROM node:18-slim

WORKDIR /app

# Install simple static server
RUN npm install -g serve

# Copy build files from previous stage
COPY --from=build /app/build ./build

# Expose port
EXPOSE 3000

# Start serving the application
CMD ["serve", "-s", "build", "-l", "3000"]
