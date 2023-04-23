const router = require('express').Router();
const Exercise = require('../../models/Exercise');
const authServices = require('../../services/auth/auth.services');
const exerciseServices = require('../../services/exercises/exercise.services');


// I don't know what is the best way to handle the exercises, one solution would be saving in the user document the id of the exercise, 
// another would be saving in the exercise document a reference to the user that created it.

// I will go for the second option in this ocassion, because I think it makes the code shorter. I don't know how to it behaves perfomance wise


// Saves a new exercise, the user ID is on req.user, this id comes in the JWT.

// Create an exercise

router.post('/', authServices.verifyToken, async (req, res, next) => {
    try {
        const exercise = {
            ...req.body,
            createdBy: req.user
        };
        const savedExercise = await exerciseServices.saveExercise(exercise);  
        res.status(201).json(savedExercise);
    } catch (error) {
        next(error)
    }
});

//Get all exercises from the user that is logged in, based on its jwt

router.get('/me', authServices.verifyToken, async (req, res, next) => {
    try {
        const exercises = await exerciseServices.getExercisesByUserId(req.user);
        res.status(200).send(exercises);
    }
     catch (error) {
        next(error);
    }
})

router.delete('/:id', authServices.verifyToken, async (req, res, next) => {
    const exerciseId = req.params.id || req.body.id;
})
/* TODO:
    - Get Exercises for any user based on its user name (maybe I should add a name as a required and unique field on the User model and index it).
    - Get Exercises by id
    - Delete user exercises
    - Update user exercises
*/
module.exports = router;