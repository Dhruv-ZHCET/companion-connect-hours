
import express from 'express';
import { prisma } from '../index';

const router = express.Router();

// Get all bookings for a user (as renter or companion)
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    let bookings;
    if (user.role === 'renter') {
      bookings = await prisma.booking.findMany({
        where: { renterId: userId },
        include: {
          companion: {
            select: {
              id: true,
              name: true,
              avatar: true,
              hourlyRate: true,
            },
          },
        },
      });
    } else {
      bookings = await prisma.booking.findMany({
        where: { companionId: userId },
        include: {
          renter: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      });
    }

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Create a new booking
router.post('/', async (req, res) => {
  try {
    const { renterId, companionId, date, startTime, endTime } = req.body;

    // Validate that renter and companion exist and have correct roles
    const renter = await prisma.user.findFirst({
      where: { id: renterId, role: 'renter' },
    });

    const companion = await prisma.user.findFirst({
      where: { id: companionId, role: 'companion' },
    });

    if (!renter) {
      return res.status(400).json({ error: 'Invalid renter ID' });
    }

    if (!companion) {
      return res.status(400).json({ error: 'Invalid companion ID' });
    }

    const booking = await prisma.booking.create({
      data: {
        date: new Date(date),
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        renterId,
        companionId,
      },
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// Update a booking status
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const booking = await prisma.booking.update({
      where: { id },
      data: { status },
    });

    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update booking status' });
  }
});

export default router;
