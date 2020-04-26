FROM node:13.11.0

# Dockerize
ENV DOCKERIZE_VERSION 0.6.1
RUN curl -LO https://github.com/jwilder/dockerize/releases/download/v$DOCKERIZE_VERSION/dockerize-linux-amd64-v$DOCKERIZE_VERSION.tar.gz \
  && tar -xzvf dockerize-linux-amd64-v$DOCKERIZE_VERSION.tar.gz -C /usr/local/bin \
  && rm dockerize-linux-amd64-v$DOCKERIZE_VERSION.tar.gz

# Arguments
ARG NODE_ENV=production
ARG MYSQL_DATABASE=default_database
ARG MYSQL_USER_INSERT=default_user
ARG MYSQL_USER_INSERT_PASSWORD=secret
ARG COD_API_EMAIL
ARG COD_API_PASSWORD

# Convert them to ENV Vars
ENV NODE_ENV=$NODE_ENV
ENV MYSQL_DATABASE=$MYSQL_DATABASE
ENV MYSQL_USER_INSERT=$MYSQL_USER_INSERT
ENV MYSQL_USER_INSERT_PASSWORD=$MYSQL_USER_INSERT_PASSWORD
ENV COD_API_EMAIL=$COD_API_EMAIL
ENV COD_API_PASSWORD=$COD_API_PASSWORD

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Permissions
RUN ["chmod", "+x", "bin/start"]