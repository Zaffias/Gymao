const mongoose = require('mongoose');
const argon2 = require('argon2');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'This email adress is not valid']
  },
  password: {
    type: String,
    required: true
  },
  exercises: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exercise'
  }]
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