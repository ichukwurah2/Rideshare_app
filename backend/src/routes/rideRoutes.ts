import { Router } from 'express';
import {
  getRides,
  getRideById,
  createRide,
  updateRide,
  assignDriver,
  completeRide,
  cancelRide,
} from '../controllers/ridesController';

const router = Router();

router.get('/', getRides);
router.get('/:id', getRideById);
router.post('/', createRide);
router.put('/:id', updateRide);
router.put('/:id/assign-driver', assignDriver);
router.put('/:id/complete', completeRide);
router.put('/:id/cancel', cancelRide);

export default router;
