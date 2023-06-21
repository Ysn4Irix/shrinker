FROM --platform=arm64 node:18-alpine
ARG PUBLIC_POCKETBASE_URL=${PUBLIC_POCKETBASE_URL}
ENV PUBLIC_POCKETBASE_URL=${PUBLIC_POCKETBASE_URL}
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build && npm prune --production
ENV PORT 80
ENV ORIGIN https://shrinker.ysnirix.live
EXPOSE 80
CMD ["node", "build"]