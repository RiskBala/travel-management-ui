# base image
FROM node:latest

#Create app directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
COPY ./src /app/src
COPY ./public /app/public

RUN npm install

COPY . /app

RUN npm build

CMD [ "npm", "start"]
