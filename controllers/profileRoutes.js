const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }],
        });
        const user = userData.get({ plain: true });
        res.render('profile', {
            ...user,
            logged_in: req.session.logged_in,
            logged_name: req.session.logged_name,
        });
    } catch (error) {
        res.status(500).json(error);
    }
});


router.get('/newpost', withAuth, (req, res) => {
    try {
        if(req.session.logged_in) {
            res.render('newPost', {
                logged_in: req.session.logged_in
        });
        return;
    }

    res.redirect('/profile');
} catch (error) {
    res.status(500).json(error);
}

});





module.exports = router;