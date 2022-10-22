FROM node:13.12.0-alpine
# Create app directory
WORKDIR /webclient

# add `/app/node_modules/.bin` to $PATH
ENV PATH /webclient/node_modules/.bin:$PATH

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

#To bundle your app’s source code inside the Docker image, use the COPY instruction:

COPY . ./

#Your app binds to port 3000 so you’ll use the EXPOSE instruction to have it mapped by the docker daemon:

#EXPOSE 1338

CMD ["npm", "start"]