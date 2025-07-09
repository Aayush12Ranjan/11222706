
import express from 'express';
import shortid from 'shortid';
import Url from '../model/ShortUrl.js';

const router = express.Router();



router.post('/shorten', async (req, res) => {
  const { fullUrl, customCode } = req.body;

  if (!fullUrl) {
    return res.status(400).json({ message: 'URL is required' });
  }

  const codeToUse = customCode || shortid.generate(); 

  
  const existingCode = await Url.findOne({ shortCode: codeToUse });
  if (existingCode) {
    return res.status(400).json({ message: 'Short code already taken' });
  }

 
  const existingUrl = await Url.findOne({ fullUrl });
  if (existingUrl) {
    return res.json({ shortUrl: `http://localhost:5000/${existingUrl.shortCode}` });
  }

 
  const newEntry = new Url({ fullUrl, shortCode: codeToUse });
  await newEntry.save();

  res.json({ shortUrl: `http://localhost:5000/${codeToUse}` });
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
