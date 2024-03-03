import express, { Request, Response } from 'express';
import { search } from '../services/search.service';

const router = express.Router();

router.get('/:engine/:query', async (req: Request, res: Response) => {
  const { query, engine } = req.params;

  try {
    const images = await search(engine, query);
    res.json(images);
  } catch (e) {
    res
      .status(400)
      .send(
        `Failed to get images for search engine: ${engine}, query: ${query}`
      );
  }
});

export default router;
