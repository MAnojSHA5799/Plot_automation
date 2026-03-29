import express from 'express';
import { getUpcomingEvents } from '../controllers/eventController';

const router = express.Router();

router.get('/', getUpcomingEvents);

export default router;
