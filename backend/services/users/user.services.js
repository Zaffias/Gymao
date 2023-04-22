const User = require('../../models/User');

async function createUser(user){
    const newUser = new User(user);
    await newUser.save();
}

// Gets an user
async function getUsers(){
    const users = await User.find();
    if(!users) throw new Error('Not users on the database')
    return users;
}

async function getUserById(id){
    const user = await User.findById(id);
    if(!user) throw new Error('User not found')
    return user; 
}

async function updateUser(id, user){

}

async function deleteUser(id){    
    const user = await User.findByIdAndDelete(id);
    if(!user) throw new Error('User not found');    
}

module.exports = {createUser, getUsers, getUserById, deleteUser, updateUser}