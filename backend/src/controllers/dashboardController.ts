import { Request, Response } from 'express';
import { Driver, Rider, Ride } from '../models';
import { fn, col } from 'sequelize';

export async function getDashboardStats(req: Request, res: Response) {
  try {
    const totalRiders = await Rider.count();
    const totalDrivers = await Driver.count();
    const totalRides = await Ride.count();

    const ridesByStatusRaw = await Ride.findAll({
      attributes: ['ride_status', [fn('COUNT', col('ride_status')), 'count']],
      group: ['ride_status'],
      raw: true,
    });

    const ridesByStatus = ridesByStatusRaw.reduce((acc: Record<string, number>, item: any) => {
      acc[item.ride_status] = Number(item.count);
      return acc;
    }, {});

    res.json({
      success: true,
      data: {
        totalRiders,
        totalDrivers,
        totalRides,
        ridesByStatus,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to fetch dashboard stats' });
  }
}
