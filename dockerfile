FROM node:alpine 
WORKDIR /contract
COPY ["package.json", "package-lock.json","tsconfig.*", "./"]
RUN npm run build
