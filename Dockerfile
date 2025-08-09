# 1. Initialize the Awoos
FROM node:24-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN echo "=== Starting build process ==="
RUN echo "Current directory contents:"
RUN ls -la
RUN echo "=== Running npm run build ==="
RUN npm run build 2>&1 | tee build.log
RUN echo "=== Build completed, checking results ==="
RUN ls -la
RUN echo "=== Checking for .next directory ==="
RUN ls -la .next 2>/dev/null || echo "ERROR: .next directory not found!"
RUN echo "=== Build log contents ==="
RUN cat build.log

# 2. Release the pack of wolves
ENV NODE_ENV=production
ENV PORT=3000

# 3. Broadcasting the HOWLs
EXPOSE 3000

CMD ["npm", "start"]