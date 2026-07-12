FROM node:22.19.0

RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    ffmpeg \
    git \
    curl \
    wget \
    jq \
    gh \
    && rm -rf /var/lib/apt/lists/*

RUN npm install -g openclaw
RUN pip3 install yt-dlp --break-system-packages

# Install sag (ElevenLabs TTS CLI)
RUN curl -fsSL https://github.com/steipete/sag/releases/download/v0.2.2/sag_linux_amd64.tar.gz | tar -xz -C /usr/local/bin/ && chmod +x /usr/local/bin/sag

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "start"]
