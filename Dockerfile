# Use official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy rest of the application
COPY . .

# Build the app
RUN npm run build

# Set environment explicitly
ENV NODE_ENV=production

# Expose app port
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start:prod"]
