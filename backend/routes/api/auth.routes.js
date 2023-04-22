const router = require('express').Router();
const authServices = require('../../services/auth/auth.services');

// Login route
router.post('/', async (req, res, next) => {
    try {
        const password = req.body.password;
        const email = req.body.email;
        const token = await authServices.login(password, email, req.app.get('secretKey'));
        if(!token) res.status(400).send('Incorrect credentials');
        res.status(200).send({message: 'Logged succesfully', token});
    } catch (error) {
        next(error);
    }
});

module.exports = router;