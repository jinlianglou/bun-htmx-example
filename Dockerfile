FROM oven/bun:latest
WORKDIR /home/bun/app
COPY ./apis .
COPY ./pages .
COPY ./static .
COPY ./index.tsx .
COPY ./package.json .
RUN bun install
VOLUME [ "/home/bun/app" ]
CMD [ "bun","start" ]