
import express from 'express';
import { prisma } from '../index';

const router = express.Router();

// Get all companions
router.get('/', async (req, res) => {
  try {
    const companions = await prisma.user.findMany({
      where: { role: 'companion' },
      include: {
        interests: {
          select: { name: true },
        },
        languages: {
          select: { name: true },
        },
        availability: true,
      },
    });

    const formattedCompanions = companions.map(companion => ({
      id: companion.id,
      name: companion.name,
      // Calculate age from birthdate in a real app
      age: 30, 
      location: 'Unknown Location', // Add this field to the User model in a real app
      bio: companion.bio || '',
      hourlyRate: companion.hourlyRate || 0,
      rating: 0, // Add this to the schema in a real app
      reviews: 0, // Add this to the schema in a real app
      avatar: companion.avatar || '',
      interests: companion.interests.map(i => i.name),
      availability: companion.availability || {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      },
      languages: companion.languages.map(l => l.name),
    }));
    
    res.json(formattedCompanions);
  } catch (error) {
    console.error('Error fetching companions:', error);
    res.status(500).json({ error: 'Failed to fetch companions' });
  }
});

// Get companion by ID
router.get('/:id', async (req, res) => {
  try {
    const companion = await prisma.user.findFirst({
      where: { 
        id: req.params.id,
        role: 'companion'
      },
      include: {
        interests: true,
        languages: true,
        availability: true,
      },
    });
    
    if (!companion) {
      return res.status(404).json({ error: 'Companion not found' });
    }
    
    res.json(companion);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch companion' });
  }
});

export default router;
