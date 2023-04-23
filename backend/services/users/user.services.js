const User = require('../../models/User');
/**
 * Creates a new user on the database
 * @param {Object} user
 * @returns  the user created
 */
async function createUser(user){
    const newUser = new User(user);
    return await newUser.save();
}

/**
 * Return all users from the database, I should add some kind of pagination. Right now is pretty useless
 * @returns {Promise<User[]>} an array of users
 */
async function getUsers(){
    const users = await User.find();
    if(!users){
        const error = new Error('Not users on the database')
        error.status = 404;
        throw error;
    }
    return users;
}

/**
 * 
 * @param {string}  user id 
 * @returns {Promise<User>}  return the user
 * @throws {Error}  if the user is not found, it adds the 404 code to the error.status
 */
async function getUserById(id){
    const user = await User.findById(id);
    if(!user){
        const error = new Error('User not found')
        error.status = 404;
        throw error;
    }
    return user; 
}

async function updateUser(id, user){
    //TODO: Implement this method
}

 /**
  * Deletes a user from the database. IT SHOULD NOT BE USED UNTIL ROLES ARE IMPLEMENTED.
  * @param {string} id
  * 
  */
async function deleteUser(id){    
    const user = await User.findByIdAndDelete(id);
    if(!user) throw new Error('User not found');    
}




module.exports = {createUser, getUsers, getUserById, deleteUser, updateUser}