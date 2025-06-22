FROM node:21.7.3-alpine AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:21.7.3-alpine  AS development
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 3000
ENTRYPOINT [ "npx","nodemon" ]

FROM node:21.7.3-alpine  AS production
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
EXPOSE 3000
ENTRYPOINT ["node", "dist/server.js"]


