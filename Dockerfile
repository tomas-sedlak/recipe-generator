# Build stage
FROM node:18-alpine

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

RUN npm i -g serve

# Copy all project files
COPY . .

# Build the project
RUN npm run build

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["serve", "-s", "dist"]
