# base image
FROM node:12.2.0

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install
RUN npm install react-scripts@3.0.1 -g --silent

# add app
COPY . /app

EXPOSE 3000

# start app
CMD ["npm", "start"] --host 0.0.0.0 --disable-host-check
