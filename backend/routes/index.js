const express = require('express');
const router = express.Router();

router.get('/hello/world', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.send('Hello world!');
})


//Add a XSRF-TOKEN cookie
router.get('/api/csrf/restore', (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie('XSRF-TOKEN', csrfToken);
    res.status(200).json({
        'XSRF-token': csrfToken
    });
});

module.exports = router;
