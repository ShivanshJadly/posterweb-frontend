# build stage (alpine kept intentionally to minimize change)
FROM node:18-alpine AS build
WORKDIR /app

# copy package manifests first (caching layer)
COPY package*.json ./

# make npm more tolerant to transient 5xxs and avoid permission errors
RUN npm config set fetch-retries 8 \
  && npm config set fetch-retry-factor 10 \
  && npm config set fetch-retry-mintimeout 10000 \
  && npm config set fetch-retry-maxtimeout 60000 \
  && npm config set registry https://registry.npmjs.org/

# optional: if you hit native build errors later, uncomment the next line
# RUN apk add --no-cache python3 make g++ libc6-compat

# install dependencies (keeps your workflow with npm ci)
RUN npm ci --unsafe-perm --verbose

COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
