import { Router } from 'express';
import { getSiteVisits, createSiteVisit } from '../controllers/siteVisitController';

const router = Router();

router.get('/', getSiteVisits);
router.post('/', createSiteVisit);

export default router;
