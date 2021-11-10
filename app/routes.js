import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  const config = req.app.get('config');

  res.render('index', {
    backendBaseUrl: config.backendBaseUrl
  });
});

export default router;
