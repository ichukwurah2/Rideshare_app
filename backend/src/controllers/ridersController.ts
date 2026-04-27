import { Request, Response } from 'express';
import { Rider } from '../models';

export async function getRiders(req: Request, res: Response) {
  try {
    const riders = await Rider.findAll();
    res.json({ success: true, data: riders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to fetch riders' });
  }
}

export async function getRiderById(req: Request, res: Response) {
  try {
    const rider = await Rider.findByPk(Number(req.params.id));

    if (!rider) {
      return res.status(404).json({ success: false, error: 'Rider not found' });
    }

    res.json({ success: true, data: rider });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to fetch rider' });
  }
}

export async function createRider(req: Request, res: Response) {
  try {
    const rider = await Rider.create(req.body);
    res.status(201).json({ success: true, data: rider });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to create rider' });
  }
}

export async function updateRider(req: Request, res: Response) {
  try {
    const rider = await Rider.findByPk(Number(req.params.id));

    if (!rider) {
      return res.status(404).json({ success: false, error: 'Rider not found' });
    }

    await rider.update(req.body);
    res.json({ success: true, data: rider });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to update rider' });
  }
}

export async function updateRiderStatus(req: Request, res: Response) {
  try {
    const rider = await Rider.findByPk(Number(req.params.id));

    if (!rider) {
      return res.status(404).json({ success: false, error: 'Rider not found' });
    }

    const { status } = req.body;
    await rider.update({ status });
    res.json({ success: true, data: rider });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to update rider status' });
  }
}
