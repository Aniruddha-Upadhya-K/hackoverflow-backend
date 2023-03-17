const { addReview, getAllCompanies, setStatus } = require('../controllers/reviews.controller');

const router = require('express').Router();

router.post('/api/addReview', addReview);
router.post('/api/submitStatus', setStatus);
router.get('/api/getAllCompanies', getAllCompanies);

module.exports = router;