const express = require('express');
const router = express.Router();

// In-memory storage for demo (in production, use MongoDB/database)
let members = [];
let memberIdCounter = 1;

// Create a new member
router.post('/', async (req, res) => {
  try {
    console.log('📝 Creating new member:', req.body);
    
    const {
      fullName,
      email,
      phone,
      age,
      gender,
      height,
      weight,
      emergencyContact,
      membershipPlan,
      goals,
      medicalConditions,
      fitnessLevel,
      preferredWorkoutTime
    } = req.body;

    // Validate required fields
    if (!fullName || !email || !phone || !age || !membershipPlan) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: fullName, email, phone, age, membershipPlan'
      });
    }

    // Check if email already exists
    const existingMember = members.find(member => member.email === email);
    if (existingMember) {
      return res.status(400).json({
        success: false,
        error: 'Email already registered'
      });
    }

    // Create new member
    const newMember = {
      id: memberIdCounter++,
      userId: `MEMBER_${Date.now()}`,
      fullName,
      email,
      phone,
      age: parseInt(age),
      gender,
      height,
      weight,
      emergencyContact,
      membershipPlan,
      goals,
      medicalConditions,
      fitnessLevel,
      preferredWorkoutTime,
      status: 'pending_payment',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Add to members array
    members.push(newMember);

    console.log('✅ Member created successfully:', newMember.userId);

    res.status(201).json({
      success: true,
      message: 'Member created successfully',
      data: {
        userId: newMember.userId,
        memberId: newMember.id,
        email: newMember.email,
        membershipPlan: newMember.membershipPlan,
        status: newMember.status
      }
    });

  } catch (error) {
    console.error('❌ Error creating member:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Get all members (for admin)
router.get('/', async (req, res) => {
  try {
    res.json({
      success: true,
      data: members,
      count: members.length
    });
  } catch (error) {
    console.error('❌ Error fetching members:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Get member by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const member = members.find(m => m.id === parseInt(id) || m.userId === id);
    
    if (!member) {
      return res.status(404).json({
        success: false,
        error: 'Member not found'
      });
    }

    res.json({
      success: true,
      data: member
    });
  } catch (error) {
    console.error('❌ Error fetching member:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Update member status (e.g., after payment)
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const memberIndex = members.findIndex(m => m.id === parseInt(id) || m.userId === id);
    
    if (memberIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Member not found'
      });
    }

    members[memberIndex].status = status;
    members[memberIndex].updatedAt = new Date().toISOString();

    res.json({
      success: true,
      message: 'Member status updated',
      data: members[memberIndex]
    });
  } catch (error) {
    console.error('❌ Error updating member status:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Delete member
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const memberIndex = members.findIndex(m => m.id === parseInt(id) || m.userId === id);
    
    if (memberIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Member not found'
      });
    }

    const deletedMember = members.splice(memberIndex, 1)[0];

    res.json({
      success: true,
      message: 'Member deleted successfully',
      data: deletedMember
    });
  } catch (error) {
    console.error('❌ Error deleting member:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

module.exports = router;
