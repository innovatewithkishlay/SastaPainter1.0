# Use Node.js 18 Alpine for a lightweight image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Define environment variables (defaults, can be overridden)
ENV PORT=5000
ENV NODE_ENV=production

# Start the application
CMD ["npm", "start"]
