const express = require('express')
const router = express.Router();
const Post = require('../models/Post')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const adminLayout = "../views/layouts/admin";
const jwtSecret = process.env.JWT_SECRET;

/**
 *
 * Check Login
*/





// GET
// Admin - Login Page Routes

 router.get('/admin', async(req, res) => {
  
  try{

    const locals = {
      title: "Admin",
      description: "Simple blog created by Nodejs, Express and MongoDB. "
    }

    res.render('admin/index', {locals, layout: adminLayout});
  }
  catch(error){
    console.log(error);
  }
 })


// POST
// Admin - check login Page Routes

router.post('/admin', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({username})

    if(!user){
      return res.status(401).json({message: 'Invalid credentials'})
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
      return res.status(401).json( { message: 'Invalid credentials' } );
    }

    const token = jwt.sign({userId: user._id}, jwtSecret);
    res.cookie('token', token, {httpOnly: true});
    res.redirect('/dashboard')

  } catch (error) {
    console.log(error);
  }
});

/**
 * GET /
 * Admin Dashboard
*/



/**
 * POST
 * Admin - Register
*/
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Received:', username, password); // ✅ debug

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await User.create({ username, password: hashedPassword });
      return res.status(201).json({ message: 'User Created', user });
    } catch (error) {
      console.error('DB Error:', error);

      if (error.code === 11000) {
        return res.status(409).json({ message: 'User already in use' });
      }

      return res.status(500).json({ message: 'Internal server error' });
    }

  } catch (error) {
    console.error('Outer error:', error);
    return res.status(500).json({ message: 'Unexpected error occurred' });
  }
});



module.exports = router;
