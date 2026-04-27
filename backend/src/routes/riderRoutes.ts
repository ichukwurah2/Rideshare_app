import { Router } from 'express';
import {
  getRiders,
  getRiderById,
  createRider,
  updateRider,
  updateRiderStatus,
} from '../controllers/ridersController';

const router = Router();

router.get('/', getRiders);
router.get('/:id', getRiderById);
router.post('/', createRider);
router.put('/:id', updateRider);
router.put('/:id/status', updateRiderStatus);

export default router;
