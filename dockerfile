FROM ubuntu:latest
RUN wget https://github.com/actions/node-versions/releases/download/12.22.12-2103540415/node-12.22.12-linux-x64.tar.gz && \
/usr/bin/tar xz --strip 1 --warning=no-unknown-keyword -C /home/runner/work/_temp/e75d7cd4-106e-442c-a2cb-461bc9cba39e -f /home/runner/work/_temp/03dcc51d-67bc-47a4-8360-9bdf3fe5fe8e
WORKDIR /contract
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run prepack
