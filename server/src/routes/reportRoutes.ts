import { Router } from 'express';
import { getReportsData } from '../controllers/reportController';

const router = Router();

router.get('/', getReportsData);

export default router;
