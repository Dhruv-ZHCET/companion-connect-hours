
import express from 'express';
import { prisma } from '../index';

const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
        bio: true,
        hourlyRate: true,
        interests: {
          select: {
            name: true,
          },
        },
      },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      include: {
        interests: true,
        languages: true,
        availability: true,
      },
    });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Create a new user
router.post('/', async (req, res) => {
  try {
    const { email, name, password, role } = req.body;
    
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }
    
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password, // In a real app, hash this password!
        role: role || 'renter',
      },
    });
    
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Update a user
router.put('/:id', async (req, res) => {
  try {
    const { name, bio, avatar, hourlyRate, interests } = req.body;
    
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: {
        name,
        bio,
        avatar,
        hourlyRate,
      },
      include: {
        interests: true,
      },
    });
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

export default router;
