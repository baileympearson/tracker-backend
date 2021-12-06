import { Router } from 'express';

const router = Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.send("HEllo world from index");
});

export default router;
