const router = require('express').Router();
const User = require('../../models/User.js');

// Post new user
router.post('/', async (req, res, next) => {
    try {

        // Checks that the request body is not empty
        if(!req.body) return res.status(400).json(req.body);
        
        const body = req.body;
        const newUser = new User(body);
        newUser.save();
    } catch (error) {
     next(error);
    }
})


router.get('/', (req, res) => {

})

module.exports = router;

