
import express from 'express';
import shortid from 'shortid';
import Url from '../model/ShortUrl.js';

import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();


router.post('/shorten', async (req, res) => {
  const { fullUrl } = req.body;

  if (!fullUrl) return res.status(400).json({ message: 'URL is required' });

  const existing = await Url.findOne({ fullUrl });
  if (existing) {
    return res.json({ shortUrl: `http://localhost:5000/${existing.shortCode}` }); 
  }
  
  const shortCode = shortid.generate();
  const newEntry = new Url({ fullUrl, shortCode });
  await newEntry.save();

  res.json({ shortUrl: `${process.env.BASE}/${shortCode}` });
});





router.get('/:code', async (req, res) => {
  const { code } = req.params;
  const entry = await Url.findOne({ shortCode: code });

  if (entry) {
    res.redirect(entry.fullUrl);
  } else {
    res.status(404).send('URL not found');
  }
});

export default router;
