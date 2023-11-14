# Use the official Node.js image as the base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install --ignore-scripts

# Copy the application code to the container
COPY . .

# Build the Next.js application
RUN npm run build

# Shrink the package
RUN npm prune --omit=dev

# Remove SWC after compiling
RUN find node_modules/@next -depth -maxdepth 1 -type d -name 'swc*' -exec rm -rf {} \;

# Cleanup safe unused files
RUN npx --yes modclean -r

# Expose the desired port (e.g., 3000)
EXPOSE 3000
# Add the environment variables here



# Start the Next.js application
CMD ["npm", "start"]
