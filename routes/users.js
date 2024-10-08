const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const users = require('../controllers/users');

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register));

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)

router.get('/logout', users.logout)
/*
router.get('/register', (req, res) => {
    res.render('users/register');
});
router.post('/register', catchAsync(async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        console.log("user id is: " + registeredUser._id);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Yelp Clone!');
            res.redirect('/business');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
}));
router.get('/login', (req, res) => {
    res.render('users/login');
})
router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'welcome back!');
    const redirectUrl = req.session.returnTo || '/business';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
})
router.get('/logout', (req, res) => {
    req.logout();
    res.render('users/logout');
})
*/
module.exports = router;