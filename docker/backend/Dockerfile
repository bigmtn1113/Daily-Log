# Use base node 8 image from Docker hub
FROM node:8

WORKDIR /backend

ENV PORT 8000
ENV DAILYLOG_DB_ADDR mongodb:27017


# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install
#CMD ["npm", "start"]

# Copy rest of the application csource code
COPY . .

# Run app.js with debugging port when container launches
ENTRYPOINT ["node", "--inspect=9229", "app.js"]

# Comment above and uncomment below to run app.js without debugger port when container launches
# ENTRYPOINT ["node", "app.js"]
