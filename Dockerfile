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

# Install sag binary (with fallback)
RUN mkdir -p /tmp/sag && \
    curl -fsSL "https://api.github.com/repos/steipete/sag/releases" | grep -o '"browser_download_url": "[^"]*linux_amd64[^"]*"' | head -1 | cut -d'"' -f4 | xargs -I {} curl -fsSL {} -o /tmp/sag.tar.gz && \
    tar -xzf /tmp/sag.tar.gz -C /usr/local/bin/ && chmod +x /usr/local/bin/sag || echo "Sag install skipped" && \
    rm -rf /tmp/sag*

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "start"]
