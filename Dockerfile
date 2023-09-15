FROM oven/bun:latest
WORKDIR /home/bun/app
COPY ./package.json .
RUN bun install
VOLUME [ "/home/bun/app" ]
CMD [ "bun","start" ]