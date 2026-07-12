FROM node:22.19.0

RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    ffmpeg \
    git \
    curl \
    wget \
    jq \
    && rm -rf /var/lib/apt/lists/*

RUN npm install -g openclaw
RUN pip3 install yt-dlp --break-system-packages

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "start"]
