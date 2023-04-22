const router = require('express').Router();
const Exercise = require('../../models/Exercise');
const authServices = require('../../services/auth/auth.services');
const exerciseServices = require('../../services/exercises/exercise.services');

// Create an exercise
// I don't know what is the best way to handle the exercises, one solution would be saving in the user document the id of the exercise, 
// another would be saving in the exercise document a reference to the user that created it.

// I will go for the second option in this ocassion cause I think it makes the code shorter but I don't know how to it behaves perfomance wise


// Saves a new excierse, the user ID is on req.user, this id comes in the JWT.

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


module.exports = router;