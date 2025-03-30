const express = require('express')
const router = express.Router();
const Post = require('../models/Post')

// GET
// HOME Routes

router.get('', async(req, res) => {
  try{
    const locals = {
      title: "Blog Website",
      description: "Simple blog created by Nodejs, Express and MongoDB. "
    }
    // Number of posts to display per page
    let perPage = 10;
    // Get current page from query string, default to page 1 if not provided
    let page = req.query.page || 1;
    // Sort posts by 'createdAt' in descending order (newest first)
    const data = await Post.aggregate([{ $sort: {createdAt: -1}}])
    // Skip documents based on current page (e.g. skip 10 for page 2)
    .skip(perPage * page - perPage)
     // Limit the number of returned documents to 'perPage'
    .limit(perPage)
    // Execute the aggregation pipeline
    .exec();

    const count =  await Post.countDocuments();
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage)

    res.render('index', {
      locals,
      data,
      current: page,
      nextPage: hasNextPage? nextPage : null
    });
  }
  catch(error){
    console.log(error);
  }

 })


//  router.get('', async(req, res) => {
//   const locals = {
//     title: "Blog Website",
//     description: "Simple blog created by Nodejs, Express and MongoDB. "
//   }
//   try{
//     const data = await Post.find();
//     res.render('index', {locals,data});
//   }
//   catch(error){
//     console.log(error);
//   }
//  })

// function insertPostData () {
//   post.insertMany([
//     {
//       title: "Building APIs with Node.js",
//       body: "Learn how to use Node.js to build RESTful APIs using frameworks like Express.js"
//     },
//     {
//       title: "Deployment of Node.js applications",
//       body: "Understand the different ways to deploy your Node.js applications, including on-premises, cloud, and container environments..."
//     },
//     {
//       title: "Authentication and Authorization in Node.js",
//       body: "Learn how to add authentication and authorization to your Node.js web applications using Passport.js or other authentication libraries."
//     },
//     {
//       title: "Understand how to work with MongoDB and Mongoose",
//       body: "Understand how to work with MongoDB and Mongoose, an Object Data Modeling (ODM) library, in Node.js applications."
//     },
//     {
//       title: "build real-time, event-driven applications in Node.js",
//       body: "Socket.io: Learn how to use Socket.io to build real-time, event-driven applications in Node.js."
//     },
//     {
//       title: "Discover how to use Express.js",
//       body: "Discover how to use Express.js, a popular Node.js web framework, to build web applications."
//     },
//     {
//       title: "Asynchronous Programming with Node.js",
//       body: "Asynchronous Programming with Node.js: Explore the asynchronous nature of Node.js and how it allows for non-blocking I/O operations."
//     },
//     {
//       title: "Learn the basics of Node.js and its architecture",
//       body: "Learn the basics of Node.js and its architecture, how it works, and why it is popular among developers."
//     },
//     {
//       title: "NodeJs Limiting Network Traffic",
//       body: "Learn how to limit netowrk traffic."
//     },
//     {
//       title: "Learn Morgan - HTTP Request logger for NodeJs",
//       body: "Learn Morgan."
//     },
//   ])
// }

//insertPostData();

// GET
// Post: id Routes

 router.get('/post/:id', async(req, res) => {
  try{
    let slug = req.params.id;
    const data = await Post.findById({_id: slug});

    const locals = {
      title: data.title,
      description: "Simple blog created by Nodejs, Express and MongoDB. "
    }
    res.render('post', {locals,data});
  }
  catch(error){
    console.log(error);
  }
 })

// GET
// Post: searchTerm Routes
 router.post('/search', async(req, res) => {

  try{
    const locals = {
      title: "search",
      description: "Simple blog created by Nodejs, Express and MongoDB. "
    }

    let searchTerm =req.body.searchTerm;
    // console.log(searchTerm);
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "")
    const data = await Post.find({
      $or: [
        {title: {$regex: new RegExp(searchNoSpecialChar, "i")}},
        {body: {$regex: new RegExp(searchNoSpecialChar, "i")}}
      ]
    });
    res.render("search", {
      data,
      locals,
      currentRoute: '/'
    });
  }
  catch(error){
    console.log(error);
  }
 })


 router.get('/about', (req, res) => {
  res.render('about');
 })


 module.exports = router;