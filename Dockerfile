FROM node:14.18.1-alpine

WORKDIR /app

ENV PORT 3000

ENV MONGOURL mongodb+srv://admin:admin123@cluster0.auvyu.mongodb.net/Admission_University?retryWrites=true&w=majority

# RUN adduser -S app

COPY package*.json .

# RUN npm install --production --silent
RUN npm install --production=true

COPY . .

# RUN chown -R app /app

# USER app

EXPOSE 3000

# CMD ["pm2-runtime", "ecosystem.config.js", "--env", "production"]
CMD [ "npm", "run", "start" ]
