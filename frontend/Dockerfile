# Use Node 20 as base image
FROM node:20

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy only package.json and lock file first for Docker layer caching
COPY package*.json ./

# Install dependencies (including devDependencies)
RUN npm install --legacy-peer-deps

# Copy the rest of your frontend app source
COPY . .

# Expose the port Vite will run on
EXPOSE 5173

# Start the Vite development server
CMD ["npx", "vite", "--host"]
