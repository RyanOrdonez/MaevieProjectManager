const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { auth, authorize } = require('../middleware/auth');

const prisma = new PrismaClient();

// Get all projects
router.get('/', auth, async (req, res) => {
  try {
    let projects;
    
    // Different queries based on user role
    if (req.user.role === 'ADMIN') {
      // Admins can see all projects
      projects = await prisma.project.findMany({
        include: {
          owner: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });
    } else if (req.user.role === 'DESIGNER') {
      // Designers can see projects they own or are members of
      projects = await prisma.project.findMany({
        where: {
          OR: [
            { ownerId: req.user.id },
            { members: { some: { id: req.user.id } } },
          ],
        },
        include: {
          owner: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });
    } else {
      // Clients can see only projects they are members of
      projects = await prisma.project.findMany({
        where: {
          members: { some: { id: req.user.id } },
        },
        include: {
          owner: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });
    }

    res.json(projects);
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get project by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        members: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user has access to this project
    const isOwner = project.ownerId === req.user.id;
    const isMember = project.members.some(member => member.id === req.user.id);
    const isAdmin = req.user.role === 'ADMIN';

    if (!isOwner && !isMember && !isAdmin) {
      return res.status(403).json({ message: 'Not authorized to access this project' });
    }

    res.json(project);
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new project
router.post('/', auth, authorize('ADMIN', 'DESIGNER'), async (req, res) => {
  try {
    const { name, description, members } = req.body;

    // Create project
    const project = await prisma.project.create({
      data: {
        name,
        description,
        ownerId: req.user.id,
        members: {
          connect: members ? members.map(id => ({ id })) : [],
        },
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        members: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.status(201).json(project);
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update project
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, status, members } = req.body;

    // Check if project exists
    const existingProject = await prisma.project.findUnique({
      where: { id },
      include: {
        members: {
          select: { id: true },
        },
      },
    });

    if (!existingProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check authorization
    const isOwner = existingProject.ownerId === req.user.id;
    const isAdmin = req.user.role === 'ADMIN';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'Not authorized to update this project' });
    }

    // Prepare member connections and disconnections
    let memberOperations = {};
    
    if (members) {
      // Get current member IDs
      const currentMemberIds = existingProject.members.map(m => m.id);
      
      // Find members to add and remove
      const membersToAdd = members.filter(id => !currentMemberIds.includes(id));
      const membersToRemove = currentMemberIds.filter(id => !members.includes(id));
      
      if (membersToAdd.length > 0) {
        memberOperations.connect = membersToAdd.map(id => ({ id }));
      }
      
      if (membersToRemove.length > 0) {
        memberOperations.disconnect = membersToRemove.map(id => ({ id }));
      }
    }

    // Update project
    const project = await prisma.project.update({
      where: { id },
      data: {
        name: name !== undefined ? name : undefined,
        description: description !== undefined ? description : undefined,
        status: status !== undefined ? status : undefined,
        members: Object.keys(memberOperations).length > 0 ? memberOperations : undefined,
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        members: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.json(project);
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete project
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if project exists
    const existingProject = await prisma.project.findUnique({
      where: { id },
    });

    if (!existingProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check authorization
    const isOwner = existingProject.ownerId === req.user.id;
    const isAdmin = req.user.role === 'ADMIN';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'Not authorized to delete this project' });
    }

    // Delete project
    await prisma.project.delete({
      where: { id },
    });

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
