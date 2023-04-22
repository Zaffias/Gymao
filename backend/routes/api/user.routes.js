const router = require('express').Router();
const userServices = require('../../services/users/user.services.js');
const authServices = require('../../services/auth/auth.services.js');

// Creates a new user
router.post('/', async (req, res, next) => {
    try {
        const user = req.body;
        await userServices.createUser(user);
        res.status(201).send({
            message: 'User created successfully',
            user
        });
    } catch (error) {
        next(error)
    }  
});

// Gets all users
router.get('/', authServices.verifyToken, async (req, res, next) => {
    try {
        const users = await userServices.getUsers();
        res.status(200).send(users)
    } catch (error) {
        next(error);
    }
});

// Gets a user
router.get('/:id', authServices.verifyToken, async (req, res, next) => {
    try {
        const id = req.params.id || req.body.id;
        const user = await userServices.getUserById(id);
        res.status(200).send(user);
    } catch (error) {
        error.code = 404;
        next(error);
    }
});

// Deletes a user
router.delete('/:id', authServices.verifyToken, async (req, res, next) => {
    try {
        const id = req.params.id || req.body.id;
        await userServices.deleteUser(id);
        res.status(200).send({message: "User deleted"});
    } catch (error) {
        next(error)
    }
    
});

// Updates a user
router.put('/:id', authServices.verifyToken, async (req, res, next) => {
    userServices.updateUser(req, res, next);
});

module.exports = router;

