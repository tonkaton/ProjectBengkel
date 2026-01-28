#region Build landing page
FROM node:22-alpine AS landing-build

WORKDIR /app

COPY ./landing/package*.json ./
RUN npm ci

COPY ./landing/src ./src
COPY ./landing/.env ./landing/index.html ./landing/postcss.config.js ./landing/tailwind.config.js ./landing/vite.config.mjs ./

RUN npm run build
COPY ./landing/assets ./dist/assets
#endregion

#region Build app
FROM node:22-alpine AS app-build

WORKDIR /app

COPY ./app/package*.json ./
RUN npm ci

COPY ./app/src ./src
COPY ./app/.env ./app/index.html ./app/postcss.config.js ./app/tailwind.config.js ./app/vite.config.js ./

RUN npm run build
#endregion

#region Nginx setup
FROM nginx:1.29.4-alpine

COPY --from=landing-build /app/dist /usr/share/nginx/landing
COPY --from=app-build /app/dist /usr/share/nginx/app

COPY ./.docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
#endregion