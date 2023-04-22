const User = require('../../models/User')
const jwt = require('jsonwebtoken');

// Login service
async function login(password, email, secret) {
        const user = await User.findOne({ email });
        if(!user) throw new Error('User not found');
        const logged  = await user.comparePassword(password);
        if(logged){
            const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1h' });
            return token;
        }else {
            return ;
        }
}

// Middleware
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