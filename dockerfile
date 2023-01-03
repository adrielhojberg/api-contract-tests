FROM node:alpine 
WORKDIR /contract
COPY ["package*.json","tsconfig.*", "./"]
RUN npm install && npm run build
