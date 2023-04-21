const router = require('express').Router();
const User = require('../../models/User');
const authServices = require('../../services/auth/auth.services');
// Login route
router.post('/', async (req, res, next) => {
    authServices.login(req, res, next);
});

module.exports = router;