# Uses the official Node.js 14 image
FROM node:14

# Set working directory
WORKDIR /app

# Copy dependencies (includes package and package-lock files)
COPY package*.json .

# Install dependencies for production
RUN npm install --production

# Copy all project files
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["npm", "start"]