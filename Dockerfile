# Stage 1 - Build
<<<<<<< HEAD

FROM node:22-alpine AS builder



WORKDIR /app



COPY package*.json ./

RUN npm install



COPY . .



RUN npm run build



# Stage 2 - Serve

FROM nginx:alpine



COPY --from=builder /app/dist /usr/share/nginx/html



EXPOSE 80



CMD ["nginx", "-g", "daemon off;"]









=======
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Stage 2 - Serve
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

>>>>>>> 4c16e9b (added jenkinsfile)
