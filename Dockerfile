FROM node:18
# Create app directory
RUN mkdir /app
WORKDIR /app

COPY package*.json ./

RUN npm install -g pnpm
RUN pnpm install

COPY . .

EXPOSE 5173

CMD [ "pnpm", "run", "dev" ]
