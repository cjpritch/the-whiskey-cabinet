const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Review } = require('../models');

// displays whiskeys on the homepage 
router.get('/', (req, res) => {
  Post.findAll({
    attributes: [
      'name'
    ],
    
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('homepage', { posts });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
