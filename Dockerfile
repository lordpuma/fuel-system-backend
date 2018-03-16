FROM node:9.5
RUN npm install -g sequelize-cli
RUN npm install -g yarn
RUN npm install -g nodemon
CMD npm start
