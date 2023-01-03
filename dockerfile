FROM node:alpine 
WORKDIR /contract
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run prepack
