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
const authMiddleware = (req,res,next) => {
  const token = req.cookies.token;

  if(!token){
    return res.status(401).json({message: 'Unauthorized'})
  }
  try{
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId;
    next();
  }catch(error){
    res.status(401).json({message:'Unauthorized' })
  }
}


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
router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    const locals = {
      title: 'Dashboard',
      description: 'Simple Blog created with NodeJs, Express & MongoDb.'
    }

    const data = await Post.find();
    res.render('admin/dashboard', {
      locals,
      data,
      layout: adminLayout
    });

  } catch (error) {
    console.log(error);
  }

});

/**
 * GET /
 * Admin - Create new post
*/

router.get('/add-post', authMiddleware, async (req, res) => {
  try {
    const locals = {
      title: 'Add Post',
      description: 'Simple Blog created with NodeJs, Express & MongoDb.'
    }

    const data = await Post.find();
    res.render('admin/add-post', {
      locals,
      data,
      layout: adminLayout
    });

  } catch (error) {
    console.log(error);
  }

});

/**
 * POST /
 * Admin - Create new post
*/

router.post('/add-post', authMiddleware, async (req, res) => {
  try {
    console.log(req.body);
    try {
      const newPost = new Post({
        title: req.body.title,
        body: req.body.body
      });
      await Post.create(newPost);
      res.redirect('/dashboard');
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
});

/**
 * GET /
 * Admin - Create new post
*/

router.get('/edit-post/:id', authMiddleware, async (req, res) => {
  try {
    const locals = {
      title: 'Edit Post',
      description: 'Free NodeJs User Management System',
    }

    const data = await Post.findOne({_id: req.params.id});
    
    res.render('admin/edit-post', {
      locals,
      data,
      layout: adminLayout
    })
  } catch (error) {
    console.log(error);
  }
});


/**
 * PUT /
 * Admin - Create new post
*/

router.put('/edit-post/:id', authMiddleware, async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      body: req.body.body,
      updatedAt: Date.now()
    })
    res.redirect(`/edit-post/${req.params.id}`)
  } catch (error) {
    console.log(error);
  }
});

/**
 * DELETE /
 * Admin - Delete post
*/

router.delete('/delete-post/:id', authMiddleware, async (req, res) => {

  try {
    await Post.deleteOne( { _id: req.params.id } );
    res.redirect('/dashboard')
  } catch (error) {
    console.log(error);
  }

});



/**
 * GET /
 * Admin - Logout
*/
router.get('/logout', (req,res) => {
  res.clearCookie('token');
  res.redirect('/')
})






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
