const mongoose = require('mongoose');
const argon2 = require('argon2');

const userSchema = new mongoose.Schema({
  userName:{
    type: String,
    required: true,
    unique: true,
    minLegth: 4
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'The email address is not valid']
  },
  password: {
    type: String,
    required: true,
    // The password validation is made on the service
  },
  exercises: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exercise'
  }]
  // TODO: Make a UserToken schema, and add a field in user linking to the Token so the user can keep logged in.
}, {timestamps: true});

// Hashing password before saving
userSchema.pre('save', async function(next) {

    // Only hash the password if it has been modified (or is new)
    if(!this.isModified('password')) return next();

    try {
        const hash = await argon2.hash(this.password);
        this.password = hash;
        next();
    } catch (error) {
        next(error);
    }
})

// Compares the hash with the user password, returns true if they match, false if they don't match or an exception occurs

userSchema.methods.comparePassword = async function(password) {
    try{
        return await argon2.verify(this.password, password);
    }catch(e){
        return false;
    }
}
// Raises an error if a field is not unique

userSchema.plugin(require('mongoose-unique-validation'), {message: 'This field is already taken.'});

const User = mongoose.model('User', userSchema);

module.exports = User;