FROM node:alpine 
WORKDIR /contract
COPY package*.json ./
RUN npm install
COPY . .
RUN ls && npm run build
