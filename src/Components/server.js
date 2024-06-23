const express = require('express');
const ytdl = require('ytdl-core');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());

app.get('/download', async (req, res) => {
  const { url, format } = req.query;
  if (!ytdl.validateURL(url)) {
    return res.status(400).send('Invalid URL');
  }

  const info = await ytdl.getInfo(url);
  const videoTitle = info.videoDetails.title.replace(/[^a-zA-Z0-9]/g, '_');
  res.header('Content-Disposition', `attachment; filename="${videoTitle}.${format === 'mp3' ? 'mp3' : 'mp4'}`);

  ytdl(url, {
    filter: format === 'mp3' ? 'audioonly' : 'videoandaudio',
    quality: format === 'mp4_720' ? 'highestvideo' : 'lowestvideo',
  }).pipe(res);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
