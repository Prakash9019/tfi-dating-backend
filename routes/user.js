// routes/user.js 
const express = require('express');
const router = express.Router();

// Mock database: List of usernames that are already taken
const TAKEN_USERNAMES = ['admin', 'test', 'praneeth', 'user123'];

// POST /api/check-username
router.post('/check-username', async (req, res) => {
  try {
    const { username } = req.body;

    // 1. Basic Validation
    if (!username || username.length < 3) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username must be at least 3 characters.' 
      });
    }

    // 2. Check "Database" 
    // In a real app, replace with: await User.findOne({ username }) 
    const isTaken = TAKEN_USERNAMES.includes(username.toLowerCase());

    if (isTaken) {
      return res.status(200).json({ 
        success: false, 
        available: false,
        message: 'username unavailable' 
      });
    }

    // 3. Username is available
    return res.status(200).json({
      success: true,
      available: true,
      message: 'username available'
    });

  } catch (error) {
    console.error('Error checking username:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// POST /api/intro 
router.post('/intro', async (req, res) => {
  try {
    const { nickname, city, gender, birthday } = req.body;

    // 1. Basic Validation 
    if (!nickname || !city || !gender || !birthday) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required.' 
      });
    }

    // 2. Simulate Database Save (Replace with actual DB logic like MongoDB/Postgres)
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      nickname,
      city,
      gender,
      birthday,
      createdAt: new Date()
    };
    
    // 3. Success Response
    return res.status(201).json({
      success: true,
      data: newUser,
      message: 'Profile updated successfully'
    });

  } catch (error) {
    console.error('Error saving user:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

module.exports = router;
