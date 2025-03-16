const express = require('express')
const router = express.Router();

router.get('', (req, res) => {
  const locals = {
    title: "Blog Website",
    description: "Simple blog created by Nodejs, Express and MongoDB. "
  }
  res.render('index', {locals});
 })

 router.get('/about', (req, res) => {
  res.render('about');
 })


 module.exports = router;