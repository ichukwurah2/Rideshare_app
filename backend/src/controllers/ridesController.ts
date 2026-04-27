import { Request, Response } from 'express';
import { Ride, Rider, Driver } from '../models';

export async function getRides(req: Request, res: Response) {
  try {
    const rides = await Ride.findAll();
    res.json({ success: true, data: rides });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to fetch rides' });
  }
}

export async function getRideById(req: Request, res: Response) {
  try {
    const ride = await Ride.findByPk(Number(req.params.id));

    if (!ride) {
      return res.status(404).json({ success: false, error: 'Ride not found' });
    }

    res.json({ success: true, data: ride });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to fetch ride' });
  }
}

export async function createRide(req: Request, res: Response) {
  try {
    const { rider_id, driver_id } = req.body;

    const rider = await Rider.findByPk(Number(rider_id));

    if (!rider) {
      return res.status(404).json({ success: false, error: 'Rider not found' });
    }

    if (driver_id) {
      const driver = await Driver.findByPk(Number(driver_id));
      if (!driver) {
        return res.status(404).json({ success: false, error: 'Driver not found' });
      }
    }

    const ride = await Ride.create({
      ...req.body,
      ride_status: req.body.ride_status || 'requested',
    });

    res.status(201).json({ success: true, data: ride });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to create ride' });
  }
}

export async function updateRide(req: Request, res: Response) {
  try {
    const ride = await Ride.findByPk(Number(req.params.id));

    if (!ride) {
      return res.status(404).json({ success: false, error: 'Ride not found' });
    }

    await ride.update(req.body);
    res.json({ success: true, data: ride });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to update ride' });
  }
}

export async function assignDriver(req: Request, res: Response) {
  try {
    const ride = await Ride.findByPk(Number(req.params.id));

    if (!ride) {
      return res.status(404).json({ success: false, error: 'Ride not found' });
    }

    const driver = await Driver.findByPk(Number(req.body.driver_id));

    if (!driver) {
      return res.status(404).json({ success: false, error: 'Driver not found' });
    }

    await ride.update({
      driver_id: driver.driver_id,
      ride_status: req.body.ride_status || 'assigned',
    });
    res.json({ success: true, data: ride });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to assign driver' });
  }
}

export async function completeRide(req: Request, res: Response) {
  try {
    const ride = await Ride.findByPk(Number(req.params.id));

    if (!ride) {
      return res.status(404).json({ success: false, error: 'Ride not found' });
    }

    await ride.update({
      ride_status: 'completed',
      dropoff_time: req.body.dropoff_time || new Date(),
    });
    res.json({ success: true, data: ride });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to complete ride' });
  }
}

export async function cancelRide(req: Request, res: Response) {
  try {
    const ride = await Ride.findByPk(Number(req.params.id));

    if (!ride) {
      return res.status(404).json({ success: false, error: 'Ride not found' });
    }

    await ride.update({ ride_status: 'cancelled' });
    res.json({ success: true, data: ride });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to cancel ride' });
  }
}
