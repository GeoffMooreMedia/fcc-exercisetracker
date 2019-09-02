const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Exercise = require('../models/Exercise');

router.post('/new-user', (req, res, next) => {
    //check for existing users
    User.findOne({ username: req.body.username }, (err, data) => {
        if (err) {
            next(err);
        }
        //if the user already exists
        else if (data) {
            //return the existing user
            res.json({ username: data.username, _id: data._id });
        }
        else {
            const newUser = new User({ username: req.body.username });

            //create the new user
            newUser.save((err, newUser) => {
                if (err) {
                    next(err);
                }
                else {
                    res.json({ username: newUser.username, _id: newUser._id });
                }
            });
        }
    });


});

router.get('/users', (req, res, next) => {
    User.find({}, (err, users) => {
        if (err) {
            next(err);
        }
        else if (users) {
            const userArr = users.map(user => {
                return { username: user.username, _id: user._id }
            });
            res.json(userArr);
        }
        else {
            res.json([]);
        }
    });
});

router.post('/add', (req, res, next) => {
    //Make sure userId is provided
    if (!req.body.userId) return next('userId Required');
    //Make sure description provided
    else if (!req.body.description) return next('Description required');
    //make sure duration provided
    else if (!req.body.duration) return next('Duration required');

    //save date
    const date = req.body.date ? new Date(req.body.date) : new Date();
    //store exercise 
    const newExercise = new Exercise({ user: req.body.userId, description: req.body.description, duration: req.body.duration, date: date });

    //save the record
    newExercise.save((err, newExercise) => {
        //check for errors
        if (err) return next(err);

        //find the user
        User.findById(req.body.userId, (err, user) => {
            //check for errors
            if (err) return next(err);
            //find all exercises for this user
            Exercise.find({ user: req.body.userId }, (err, exercises) => {
                //check for errors
                if (err) return next(err);
                //return the user with the array of exercises
                res.json({ username: user.username, exercises: exercises });
            })
        });
    });
});

router.get('/log', (req, res, next) => {
    //make sure the userId is provided
    if (!req.query.userId) return next('userID required');
    //find all exercises for this user
    Exercise.find({ user: req.query.userId }, (err, exercises) => {
        //check for errors
        if (err) return next(err);
        //find the user
        User.findById(req.query.userId, (err, user) => {
            //check for errors
            if (err) return next(err);
            //return the data
            res.json({ username: user.username, logs: exercises, count: exercises.length });
        });
    });
});

module.exports = router;