FROM node:22.16.0

WORKDIR /backend

COPY . .

RUN npm install
RUN chmod +x wait-for-it.sh

EXPOSE 1337

CMD ["./wait-for-it.sh", "db:3306", "--", "npm", "run", "start"]
