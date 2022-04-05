FROM node
LABEL authors="Akshat Mehta"


RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# COPY package*.json ./ \
#     ./source ./

# This will copy everything from the source path 
# --more of a convenience when testing locally.
COPY . .


RUN npm install -g npm-check-updates \
    ncu -u \
    npm install \
    npm install express \
    npm install babel-cli \
    npm install babel-preset \
    npm install babel-preset-env


RUN npm ci --only=production


COPY . /app

EXPOSE 30002

CMD [ "babel-node", "app.js" ]
