const express = require('express');
const router = express.Router();
const User = require('../models/User');

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
    const newUser = new User({ username: req.body.username });

});

router.get('/users', (req, res) => {

});

router.post('/add', (req, res) => {

});

router.get('/log', (req, res) => {

});

module.exports = router;