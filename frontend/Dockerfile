# Use Node 21 as parent image
FROM node:21.1.0

# Change the working directory on the Docker image to /app
WORKDIR /app

# Copy package.json and package-lock.json to the /app directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of project files into this image
COPY . .

# Build the project
RUN npm run build

# Expose application port
EXPOSE 3000

# Start the application
CMD npm run serve