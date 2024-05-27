FROM node:20-alpine
COPY src /app
WORKDIR /app
RUN yarn set version 3.5.1
RUN yarn
RUN yarn run bundle 
CMD ["yarn", "start"]
