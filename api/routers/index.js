const { Router } = require('express');

const router = Router();

router.get('/ping', (req, res) => {
  res.send('pong');
});

router.post('/connect', (req, res, next) => {
  try {
    const { entities } = req.body;

    console.log('entities');
    console.dir(entities, { depth: 3 });
    console.log('connecting to client. posts', entities?.posts?.length);

    // concepts

    // for (let concept of entities.concepts) {

    // }

    res.json({ success: true });
  }
  catch(err) {
    next(err);
  }
});

router.post('/next-review-item', (req, res, next) => {
  try {
    res.json({ success: true });
  }
  catch(err) {
    next(err);
  }
});

router.post('/submit-response', (req, res, next) => {
  try {
    res.json({ success: true });
  }
  catch(err) {
    next(err);
  }
});

module.exports = router;
