const User = require('../../models/User')
const jwt = require('jsonwebtoken');

//Login
async function login(req, res, next) {
    try {
        const password = req.body.password;
        const email = req.body.email;
        const user = await User.findOne({ email });
        if(!user) res.status(404).json({ message: 'User not found' });
        const logged  = await user.comparePassword(password);
        if(logged){
            const token = jwt.sign({ id: user._id }, req.app.get('secretKey'), { expiresIn: '1h' });
            res.status(200).json({ message: 'Login success', token });
        }else{
            res.status(401).json({ message: 'Invalid password' });
        }
    }
     catch (error) {
        next(error);
    }
}


function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send({ message: 'Unauthorized request' });
    }
    let token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).send({ message: 'Unauthorized request' });
    }
    let payload = jwt.verify(token, req.app.get('secretKey'));
    if (!payload) {
        return res.status(401).send({ message: 'Unauthorized request' });
    }
    req.userId = payload.id;
    next();
}

module.exports = { login, verifyToken };