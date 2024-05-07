const express = require('express');
// const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');

const { User } = require('../../db/models');

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('firstName')
        .exists({ checkFalsy: true })
        .isLength({ min: 2 })
        .withMessage('Please provide a first name with at least 2 characters'),
    check('lastName')
        .exists({ checkFalsy: true })
        .isLength({ min: 2 })
        .withMessage('Please provide a last name with at least 2 characters'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or mode.'),
    handleValidationErrors
]


const router = express.Router();

router.post('/', validateSignup, async (req, res, next) => {
    // const { username, email, password } = req.body;

    const newUser = await User.signup(req.body);

    if (newUser instanceof Error) {
        return next(newUser);
    }
    const safeUser = newUser.toSafeObject();

    setTokenCookie(res, safeUser);

    res.json({ user: safeUser });


})



module.exports = router;
