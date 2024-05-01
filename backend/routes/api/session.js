const express = require('express')
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { buildError } = require('../../utils/buildError');

const { setTokenCookie, restoreUser } = require('../../utils/auth');

const { User } = require('../../db/models');

const router = express.Router();


router.route('/')
    .post(async (req, res, next) => {
        // const { credential, password } = req.body;

        // console.log(credential)

        const user = await User.login(req.body);

        if (!user) {
            const loginErr = buildError('Login Failed', 'Login Failed', 401)
            loginErr.errors = { credential: 'The provided credentials were invalid' }
            return next(loginErr);
        }

        const userObj = user.toSafeObject();

        await setTokenCookie(res, userObj);

        return res.json({ user: userObj })
    })
    .delete(async (_req, res, next) => {
        res.clearCookie('token');
        return res.json({ message: 'log out successful' });
    })








module.exports = router;
