const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/new-user',(req,res,next)=>{
    const newUser = new User({username:req.body.username});
    newUser.save((err,data)=>{
        if(err){
            next(err);
        }
        else{
            res.json({username:data.username,_id:data._id});
        }
    });
});

router.get('/users',(req,res)=>{

});

router.post('/add',(req,res)=>{

});

router.get('/log',(req,res)=>{

});

module.exports = router;