const User = require('../../models/User')
const jwt = require('jsonwebtoken');

/**
 * Tries to login a user.
 * @param {string} password 
 * @param {string} email 
 * @param {string} secret 
 * @returns 
 * @throws 401 if the credentials are invalid.
 */
async function login(password, email, secret) {
        const user = await User.findOne({ email });
        if(!user) {
            const error = new Error('Invalid credentials');
            error.status = 401;
            throw error;
        }
        //  Method of the user schema that compares the password with the hashed one stored on the database.
        const logged  = await user.comparePassword(password);
        if(logged){
            const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1h' });
            return {token, user};
        }else {
            const error = new Error('Invalid credentials');
            error.status = 401;
            throw error;
        }
}

/**
 * Verifies that the request has a valid token.
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @param {function} next 
 * @returns Express.Response
 */
function verifyToken(req, res, next) {
    // Checks that the headers have an authorization field
    if (!req.headers.authorization) {
        return res.status(401).send({ message: 'Unauthorized request' });
    }
    let token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).send({ message: 'Unauthorized request' });
    }
    // Verifies the token
    let payload = jwt.verify(token, req.app.get('secretKey'));
    if (!payload) {
        return res.status(401).send({ message: 'Unauthorized request' });
    }
    // Saves the id of the user doing the request
    req.user = payload.id;
    next();
}

//TODO: Add a refresh token so the user can keep logged in.
module.exports = { login, verifyToken };