const router = require('express').Router();
const { Review } = require('../../models');
const withAuth = require('../../utils/auth');

// get all reviews.../api/reviews 
router.get('/', (req, res) => {
    Review.findAll()
      .then(dbReviewData => res.json(dbReviewData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// post a review.../api/reviews
router.post('/', (req, res) => {
  if (req.session) {
    Review.create({
        review_text: req.body.review_text,
        user_id: req.session.user_id,
        post_id: req.body.post_id
    })
    .then(dbReviewData => res.json(dbReviewData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  }
});

// delete a review.../api/reviews/:id
router.delete('/:id', withAuth, (req, res) => {
    Review.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbReviewData => {
        if (!dbReviewData) {
          res.status(404).json({ message: 'No review found with this id' });
          return;
        }
        res.json(dbReviewData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;
