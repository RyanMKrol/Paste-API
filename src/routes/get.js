import express from 'express';

import { fetchPasteItem } from '../api';

const router = express.Router();

router.get('/:uri', async (req, res) => {
  fetchPasteItem(req.params.uri)
    .then((data) => {
      if (data && data.Items && data.Items.length > 0) {
        res.send(data.Items[0]);
      } else {
        res.status(404).send('Could not find your paste, sorry!');
      }
    })
    .catch(() => {
      res.status(500).send('Internal Server Error');
    });
});

export default router;
