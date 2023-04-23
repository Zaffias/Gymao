
const Exercise = require('../../models/Exercise');

/**
 * Saves a new exercise on the database
 * @param {object} exercise to be saved.
 * @returns {Promise<object>} - Saved exercise
 * @async
 * @throws {Error} if the exercise can't be saved
 * @example
 * const exercise = {
 *  name: 'Push ups',
 *  createdBy: 'XXXXXXXXXXXXXXXXXXXXXXXX'
 * }
 * await saveExercise(exercise)
 */
async function saveExercise(exercise){
    const newExercise = new Exercise(exercise);
    const savedExercise = await newExercise.save();
    return savedExercise;
}


/**
 * Get all exercises from an user based on its id.
 * @param {string} - id 
 * @returns {Promise<Exercise[]>} - a list of exercises
 * @async
 */
async function getExercisesByUserId(id){
    const exercises = await Exercise.find({ createdBy: id });
    // I don't need a not found exception here
    return exercises;
}

module.exports = { saveExercise, getExercisesByUserId }