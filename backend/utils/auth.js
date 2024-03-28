const jwt = require('jsonebtoken');
const {jwtConfig} = require('../config');
const {User} = require('../db/models');
const {secret, expiresIn} = jwtConfig;

const setTokenCookie = (req, user) => {

}