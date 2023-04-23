const router = require('express').Router();
const userServices = require('../../services/users/user.services.js');
const authServices = require('../../services/auth/auth.services.js');

// Creates a new user
router.post('/', async (req, res, next) => {
    try {
        const user = req.body;
        // Assures that the password meets the critera one uppercase letter, one number and one special character
        if(!user.password.match(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{9,}$/gm)){
            return res.status(400).send({
                message: 'Password must contain at least one uppercase letter, one number and one special character'
            });
        }
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

// Sends the user that its making the request bassed on the jwt token.
router.get('/me', authServices.verifyToken, async (req, res, next) => {
    try {
        
        const {email, name, exercises} = await userServices.getUserById(req.user);
        res.status(200).send({email, name, exercises});
    } catch (error) {
        next(error)
    }
})

// Gets a user
router.get('/:id', authServices.verifyToken, async (req, res, next) => {
    try {
        const id = req.params.id || req.body.id;
        const user = await userServices.getUserById(id);
        res.status(200).send(user);
    } catch (error) {
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
        next(error);
    }
    
});

// Updates a user
router.put('/:id', authServices.verifyToken, async (req, res, next) => {
    userServices.updateUser(req, res, next);
});


module.exports = router;

