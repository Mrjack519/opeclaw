---
name: youtube
description: Search YouTube videos, get channel info, fetch transcripts, and download video/audio and send to the user via Telegram, using YouTube Data API v3 via MCP server with yt-dlp fallback for transcripts and downloads.
metadata: {"clawdbot":{"emoji":"📹","requires":{"bins":["yt-dlp"],"npm":["zubeid-youtube-mcp-server"]},"primaryEnv":"YOUTUBE_API_KEY"}}
---

# YouTube Research, Transcription & Download

Search YouTube, get video/channel info, fetch transcripts, and download video/audio for the user.

## Setup Check (run once per session)

Before using this skill, verify the API key is loaded:
```bash
test -n "$YOUTUBE_API_KEY" && echo "KEY OK" || echo "KEY MISSING"
```
If "KEY MISSING", tell the user to check Railway Variables — do not proceed with API search, use yt-dlp fallback instead.

## 1. Search Videos (use this for ANY "find/search a video" request)

```bash
mcporter call --stdio "node /tmp/youtube-mcp-server/dist/cli.js" \
  search_videos query="SEARCH TERMS HERE" maxResults:5
```

If this MCP server isn't built yet at `/tmp/youtube-mcp-server`, build it first:
```bash
cd /tmp
git clone https://github.com/ZubeidHendricks/youtube-mcp-server
cd youtube-mcp-server
npm install
npm run build
```

**IMPORTANT — never invent search results.** If this command fails or returns nothing, tell the user search failed and why. Do not fabricate video titles, view counts, or IDs.

## 2. Get Video Details

```bash
mcporter call --stdio "node /tmp/youtube-mcp-server/dist/cli.js" \
  videos_details videoId="VIDEO_ID"
```

## 3. Get Transcript

**Primary (MCP, no quota cost):**
```bash
mcporter call --stdio "node /tmp/youtube-mcp-server/dist/cli.js" \
  transcripts_getTranscript videoId="VIDEO_ID"
```

**Fallback (yt-dlp, if MCP transcript is empty or fails):**
```bash
yt-dlp --skip-download --write-auto-sub --sub-lang en --sub-format vtt \
  --output "/tmp/%(id)s.%(ext)s" \
  "https://youtube.com/watch?v=VIDEO_ID"
cat /tmp/VIDEO_ID.en.vtt
```

## 4. Download Video/Audio and Send to User (Telegram)

Telegram bot file-send limit is 50MB. ALWAYS default to audio-only unless the user explicitly asks for video.

**Step 1 — Download (audio, default, smallest size):**
```bash
yt-dlp -x --audio-format mp3 -o "/tmp/%(id)s.%(ext)s" "https://youtube.com/watch?v=VIDEO_ID"
```

**Step 1b — Download (video, only if user explicitly wants video, capped at 360p to stay under limit):**
```bash
yt-dlp -f "bestvideo[height<=360]+bestaudio/best[height<=360]" \
  --merge-output-format mp4 -o "/tmp/%(id)s.%(ext)s" "https://youtube.com/watch?v=VIDEO_ID"
```

**Step 2 — Check file size before sending:**
```bash
ls -lh /tmp/VIDEO_ID.*
```
If the file is over 45MB, do NOT attempt to send it — tell the user it's too large for Telegram and offer the audio-only version instead, or a lower resolution.

**Step 3 — Send the file to the user.**
You have a file-transfer capability loaded as a plugin (registered command `/file`). You MUST actively use it to deliver the downloaded file to the user's chat — downloading to `/tmp` alone does NOT deliver anything to the user. Do not report "download complete" in text without actually sending the file through this capability. If you cannot find or invoke a file-send tool/command, tell the user explicitly that the file downloaded successfully to the server but could not be transmitted to them, and why.

**Step 4 — Clean up after sending:**
```bash
rm -f /tmp/VIDEO_ID.*
```
(Railway's filesystem is ephemeral and wipes on restart anyway, but clean up mid-session to save disk space.)

## Troubleshooting

**"Sign in to confirm you're not a bot" / 403 errors on download:**
YouTube blocks server IPs without cookies. This may not be fixable without a cookies.txt file (requires exporting from a real browser session — ask the user if this becomes a persistent blocker, since it involves their account credentials and has privacy tradeoffs).

**MCP server "Connection closed" or "YOUTUBE_API_KEY environment variable is required":**
Rebuild from source and test directly:
```bash
cd /tmp && rm -rf youtube-mcp-server
git clone https://github.com/ZubeidHendricks/youtube-mcp-server
cd youtube-mcp-server && npm install && npm run build
YOUTUBE_API_KEY="$YOUTUBE_API_KEY" node dist/cli.js
```

**yt-dlp not found:**
```bash
pip3 install --break-system-packages -U yt-dlp
```

## API Quota

- Search: 100 units/call
- Video details: 1 unit/call
- Transcript: 0 units (separate mechanism)
- Daily limit: 10,000 units — be conservative with search, transcript lookups are free.

## Notes

- MCP server path: `/tmp/youtube-mcp-server/dist/cli.js` (rebuilds needed each container restart since `/tmp` is ephemeral)
- Downloads go to `/tmp` — always send immediately, never assume the file persists
- Never fabricate video data (titles, IDs, view counts, transcripts) if a tool call fails — report the failure honestly
