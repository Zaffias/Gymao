const router = require('express').Router();

router.use('/api/user', require('./api/user.routes'));
router.use('/api/auth', require('./api/auth.routes'));


module.exports = router;