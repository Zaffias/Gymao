const router = require('express').Router();
const authServices = require('../../services/auth/auth.services');

// Login route
router.post('/', async (req, res, next) => {
    try {
        const password = req.body.password;
        const email = req.body.email;
        const {token, user} = await authServices.login(password, email, req.app.get('secretKey'));
        res.status(200).send({message: 'Logged succesfully', token, userDTO: {email: user.email, exercises: user.exercises}});
    } catch (error) {
        next(error);
    }
});

module.exports = router;