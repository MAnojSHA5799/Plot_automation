import { Router } from 'express';
import { getPlots, createPlot } from '../controllers/plotController';

const router = Router();

router.get('/', getPlots);
router.post('/', createPlot);

export default router;
