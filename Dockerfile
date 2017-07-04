FROM node:boron

RUN mkdir /repoManager
WORKDIR /repoManager

COPY package.json /repoManager
RUN npm install

COPY . /repoManager

EXPOSE 3000 

CMD ["npm", "start"]


