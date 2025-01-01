FROM node:16.20.2-alpine

# if you want to build assets, build the container with the argument BUILD_ASSETS=true
ARG BUILD_ASSETS

WORKDIR /var/www/user

COPY . .

#RUN if [ ! -e ".env" ]; then cp .env.local .env; else rm -f .env.local ;fi 

RUN yarn install
RUN apk add openrc curl --no-cache

RUN if [ "$BUILD_ASSETS" = "true" ]; then yarn build; fi

CMD yarn start