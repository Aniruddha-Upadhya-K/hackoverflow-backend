const { addReview } = require('../controllers/reviews.controller');

const router = require('express').Router();

router.post('/api/addReview', addReview);

module.exports = router;