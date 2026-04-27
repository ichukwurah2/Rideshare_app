import { Router } from 'express';
import riderRoutes from './riderRoutes';
import driverRoutes from './driverRoutes';
import rideRoutes from './rideRoutes';
import dashboardRoutes from './dashboardRoutes';

const router = Router();

router.use('/riders', riderRoutes);
router.use('/drivers', driverRoutes);
router.use('/rides', rideRoutes);
router.use('/dashboard', dashboardRoutes);

export default router;
