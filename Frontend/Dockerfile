# Base stage
FROM node:21.7.3-alpine AS base
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

# Development stage
FROM base AS development
ENV NODE_ENV=development
EXPOSE 5173
CMD ["npm", "run", "dev"]

# Production stage
FROM node:21.7.3-alpine AS build
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# Nginx stage
FROM nginx:alpine AS production
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist .
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
