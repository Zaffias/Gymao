const router = require('express').Router();

router.use('/api/user', require('./api/user.routes'));

module.exports = router;