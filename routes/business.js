const express = require('express');
const router = express.Router();
const business = require('../controllers/business');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateBusiness } = require('../middleware');
const multer = require('multer');
const {storage} =  require('../cloudinary');
const upload = multer({storage});



router.route('/')
    .get(catchAsync(business.index))
    .post(isLoggedIn,  upload.array('image'), validateBusiness, catchAsync(business.createBusiness))

router.get('/new', isLoggedIn, business.renderNewForm)

router.route('/:id')
    .get(catchAsync(business.showBusiness))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateBusiness, catchAsync(business.updateBusiness))
    .delete(isLoggedIn, isAuthor, catchAsync(business.deleteBusiness));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(business.renderEditForm))

/*
router.get('/', catchAsync(async(req, res) => {
    const business = await Business.find({});
    console.log(business);
    res.render('businesses/index', { business });
}));
router.get('/new',async(req, res) => {
    res.render('businesses/new');
})
router.post('/', catchAsync(async(req, res, next) => {
    const business = new Business(req.body.business);
    await business.save();
    req.flash('success', 'Successfully made a new business!');
    res.redirect(`/business/${business._id}`);
}));
router.get('/:id', catchAsync(async(req, res) => {
    const business = await Business.findById(req.params.id).populate('reviews');
    if (!business) {
        req.flash('error', 'Cannot find that business!');
        return res.redirect('/business');
    }
    res.render('businesses/show', {business })
}));
router.get('/:id/edit', catchAsync(async(req, res) => {
    const business = await Business.findById(req.params.id);
    if (!business) {
        req.flash('error', 'Cannot find that business!');
        return res.redirect('/business');
    }
    res.render('businesses/edit', {business });
}));
router.put('/:id', catchAsync(async(req, res) => {
    const { id } = req.params;
    const business = await Business.findByIdAndUpdate(id, { ...req.body.business });
    req.flash('success', 'Successfully updated business!');
    res.redirect(`/business/${business._id}`)
}));
router.delete('/:id',  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Business.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted business')
    res.redirect('/business');
}));
*/
module.exports = router;