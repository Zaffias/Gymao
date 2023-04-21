const router = require('express').Router();
const User = require('../../models/User.js');
const userServices = require('../../services/users/users.services.js');
const authServices = require('../../services/auth/auth.services.js');
// Creates a new user

router.post('/', async (req, res, next) => {
    userServices.createUser(req, res, next);
});

// Gets all users
router.get('/', authServices.verifyToken, async (req, res, next) => {
    userServices.getUsers(req, res, next);
});

// Gets a user
router.get('/:id', authServices.verifyToken, async (req, res, next) => {
    userServices.getUserById(req, res, next);
});
// Deletes a user
router.delete('/:id', authServices.verifyToken, async (req, res, next) => {
    userServices.deleteUser(req, res, next);
});
// Updates a user
router.put('/:id', authServices.verifyToken, async (req, res, next) => {
    userServices.updateUser(req, res, next);
});

module.exports = router;

