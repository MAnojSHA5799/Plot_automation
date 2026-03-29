import express from 'express';
import { getSentimentAnalysis } from '../controllers/sentimentController';

const router = express.Router();

router.get('/', getSentimentAnalysis);

export default router;
