import { Router } from 'express';
import {
  getDrivers,
  getDriverById,
  createDriver,
  updateDriver,
  updateDriverStatus,
  updateDriverAvailability,
} from '../controllers/driversController';

const router = Router();

router.get('/', getDrivers);
router.get('/:id', getDriverById);
router.post('/', createDriver);
router.put('/:id', updateDriver);
router.put('/:id/status', updateDriverStatus);
router.put('/:id/availability', updateDriverAvailability);

export default router;
