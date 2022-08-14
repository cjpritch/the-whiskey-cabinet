const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Review } = require('../models');

// displays whiskeys on the homepage 
router.get('/', (req, res) => {
  Post.findAll({
    attributes: [
      'name',
      'id'
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

// login/create an account page
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
    'name'
    ],
    include: [
      {
        model: Review,
        attributes: ['id', 'review_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      // serialize the data
      const post = dbPostData.get({ plain: true });

      // pass data to template
      res.render('reviews', { post });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});
  
module.exports = router;
