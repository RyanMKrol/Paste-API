import express from 'express';

const router = express.Router();

// eslint-disable-next-line no-unused-vars
router.post('/', async (req, res) => {
  res.send(req.body);

  const { title, content, ttlDays } = req.body;
  console.log();
  console.log(title);
  console.log(content);
  console.log(ttlDays);
});

export default router;
