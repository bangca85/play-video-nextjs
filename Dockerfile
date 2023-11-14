# Step 1: Build the application
FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./
 
# Install dependencies
RUN npm install --frozen-lockfile

COPY . .

RUN npm run build

# Step 2: Serve the application
FROM node:18-alpine
 
WORKDIR /app 
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
 
EXPOSE 3000

# Run the app
CMD ["npm", "start"]
