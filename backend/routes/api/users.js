const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');

const { User } = require('../../db/models');


const router = express.Router();

router.post('/', async (req, res, next) => {
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
