const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  muscleGroup: {type: String},
  description: {type: String},
  sets: {type: Number},
  reps: {type: Number},
  weight: {type: Number},
  duration: {type: Number},
  date: {type: Date},
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});

exerciseSchema.pre('save', function(next){
  if(!this.date)
    this.date = new Date().getTime();
  next();
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
