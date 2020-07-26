import express from 'express';

import { storePasteItem } from '../api';

const router = express.Router();

function generateTtlDate(ttlDays) {
  const date = new Date();

  date.setDate(date.getDate() + ttlDays);

  return date.getTime();
}

router.post('/', async (req, res) => {
  const ttlDateEpoch = generateTtlDate(req.body.ttlDays);

  const storageItem = {
    uri: req.body.uri,
    title: req.body.title,
    content: req.body.content,
    ttl: ttlDateEpoch,
  };

  // store item
  await storePasteItem(storageItem);

  res.send(storageItem);
});

export default router;
