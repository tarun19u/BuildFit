const express = require('express');
const router = express.Router();

// In-memory storage for demo
let members = [];

// Simple test route
router.get('/', (req, res) => {
  console.log('📝 GET /api/members called');
  res.json({
    success: true,
    message: 'Members endpoint is working!',
    data: members
  });
});

// Simple POST route
router.post('/', (req, res) => {
  console.log('🔄 Starting POST /api/members handler...');

  try {
    console.log('📝 POST /api/members called with:', req.body);
    console.log('🔍 Creating new member object...');

    const newMember = {
      id: Date.now(),
      userId: 'MEMBER_' + Date.now(),
      fullName: req.body.fullName || 'Unknown',
      email: req.body.email || 'no-email',
      phone: req.body.phone || 'no-phone',
      age: req.body.age || 0,
      membershipPlan: req.body.membershipPlan || 'basic',
      status: 'pending_payment',
      createdAt: new Date().toISOString()
    };

    console.log('💾 Adding member to array...');
    members.push(newMember);
    console.log('📊 Total members now:', members.length);

    const response = {
      success: true,
      message: 'Member created successfully',
      data: {
        userId: newMember.userId,
        email: newMember.email,
        membershipPlan: newMember.membershipPlan
      }
    };

    console.log('✅ Sending response:', response);
    res.status(201).json(response);
    console.log('🎉 Response sent successfully!');

  } catch (error) {
    console.error('❌ Error in POST /api/members:', error);
    console.error('❌ Error stack:', error.stack);
    res.status(500).json({
      success: false,
      error: 'Internal server error: ' + error.message
    });
  }
});

// Stats endpoint for MembershipData component
router.get('/stats', (req, res) => {
  console.log('📊 GET /api/members/stats called');

  const stats = {
    totalMembers: members.length,
    activeMembers: members.filter(m => m.status === 'active').length,
    pendingMembers: members.filter(m => m.status === 'pending_payment').length,
    membershipTypes: {
      basic: members.filter(m => m.membershipPlan === 'basic').length,
      premium: members.filter(m => m.membershipPlan === 'premium').length,
      elite: members.filter(m => m.membershipPlan === 'elite').length
    },
    recentMembers: members.slice(-5).reverse() // Last 5 members
  };

  res.json({
    success: true,
    data: stats
  });
});

module.exports = router;
