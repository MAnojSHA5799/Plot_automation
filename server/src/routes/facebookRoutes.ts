import express from 'express';
import { getFacebookInsights } from '../controllers/facebookController';

const router = express.Router();

router.get('/insights', getFacebookInsights);

export default router;
