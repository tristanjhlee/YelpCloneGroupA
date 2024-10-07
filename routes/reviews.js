const express = require('express');
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const Business = require('../models/business');
const Review = require('../models/review');
const reviews = require('../controllers/reviews');
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

/*router.post('/', catchAsync(async(req, res) => {
    const business = await Business.findById(req.params.id);
    //console.log("review content is "+ req.body.review.body);
    const review = new Review(req.body.review);
    business.reviews.push(review);
    await review.save();
    await business.save();
    req.flash('success', 'Created new review!');
    res.redirect(`/business/${business._id}`);
}))
router.delete('/:reviewId',catchAsync(async (req, res) => {
    const{id,reviewId} = req.params;
    await Business.findByIdAndUpdate(id,{$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'successfully deleted a review.');
    res.redirect(`/business/${id}`);
}))*/

module.exports = router;