const User = require('../../models/User');

async function createUser(req, res , next){
    try {
        // Checks that the request body is not empty
        if(!req.body) return res.status(400).json(req.body);
        const body = req.body;
        const newUser = new User(body);
        await newUser.save();
        res.status(201).send({
            message: 'User created successfully',
            user: newUser
        });
    }catch(error) {
        error.status = 400;
        next(error);
    }
}

async function getUsers(req, res, next){
    try {
        const users = await User.find();
        
        if(!users) return res.status(404).send({message: 'Users not found'});

        res.status(200).send(users);
    } catch (error) {
        next(error);
    }
}

async function getUserById(req, res, next){
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        
        if(!user) return res.status(404).send({message: 'User not found'});
        
        res.status(200).send(user);
    } catch (error) {
        next(error);
    }
}

async function updateUser(req, res, next){
    try {
        
    } catch (error) {
        next(error)
    }
}

async function deleteUser(req, res, next){
    try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete(id);
        if(!user) return res.status(404).send({message: 'User not found'});
        res.status(200).send({message: 'User deleted successfully'});
    }
    catch (error) {
        next(error)
    }
}

module.exports = {createUser, getUsers, getUserById, deleteUser, updateUser}