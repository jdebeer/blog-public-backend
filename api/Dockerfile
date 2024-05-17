# Use an official Node.js 18 Alpine image as the base
FROM node:18-alpine

# Install bash
RUN apk add --no-cache bash

ENV APP_HOME=/api-src
WORKDIR $APP_HOME

# Copy package.json for both API and client
COPY package*.json ./

# Install API dependencies
RUN npm install

# Copy the entire application source
COPY . .

# Make the wait-for-it.sh script executable
COPY wait-for-it.sh /usr/wait-for-it.sh
RUN chmod +x /usr/wait-for-it.sh

# Expose the application port
EXPOSE 5000
