FROM oven/bun:latest
WORKDIR /home/bun/app
VOLUME [ "/home/bun/app" ]
CMD [ "bun","start" ]