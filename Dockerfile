FROM node:16-alpine
COPY src /app
WORKDIR /app
RUN yarn
RUN yarn run bundle 
CMD ["yarn", "start"]
