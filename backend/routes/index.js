const router = require('express').Router();

// Barrel file to export everything related to routes.

router.use('/api/user', require('./api/user.routes'));
router.use('/api/auth', require('./api/auth.routes'));


module.exports = router;