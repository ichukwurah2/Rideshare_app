import { Request, Response } from 'express';
import { Driver } from '../models';

export async function getDrivers(req: Request, res: Response) {
  try {
    const drivers = await Driver.findAll();
    res.json({ success: true, data: drivers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to fetch drivers' });
  }
}

export async function getDriverById(req: Request, res: Response) {
  try {
    const driver = await Driver.findByPk(Number(req.params.id));

    if (!driver) {
      return res.status(404).json({ success: false, error: 'Driver not found' });
    }

    res.json({ success: true, data: driver });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to fetch driver' });
  }
}

export async function createDriver(req: Request, res: Response) {
  try {
    const driver = await Driver.create(req.body);
    res.status(201).json({ success: true, data: driver });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to create driver' });
  }
}

export async function updateDriver(req: Request, res: Response) {
  try {
    const driver = await Driver.findByPk(Number(req.params.id));

    if (!driver) {
      return res.status(404).json({ success: false, error: 'Driver not found' });
    }

    await driver.update(req.body);
    res.json({ success: true, data: driver });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to update driver' });
  }
}

export async function updateDriverStatus(req: Request, res: Response) {
  try {
    const driver = await Driver.findByPk(Number(req.params.id));

    if (!driver) {
      return res.status(404).json({ success: false, error: 'Driver not found' });
    }

    const { status } = req.body;
    await driver.update({ status });
    res.json({ success: true, data: driver });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to update driver status' });
  }
}

export async function updateDriverAvailability(req: Request, res: Response) {
  try {
    const driver = await Driver.findByPk(Number(req.params.id));

    if (!driver) {
      return res.status(404).json({ success: false, error: 'Driver not found' });
    }

    const { availability_status } = req.body;
    await driver.update({ availability_status });
    res.json({ success: true, data: driver });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to update driver availability' });
  }
}
