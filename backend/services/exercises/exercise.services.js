const Exercise = require('../../models/Exercise');

async function saveExercise(exercise){
    const newExercise = new Exercise(exercise);
    const savedExercise = await newExercise.save();
    return savedExercise;
}



module.exports = { saveExercise }