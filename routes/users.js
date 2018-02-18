const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.post('/signup', (req, res, next) => {
    //console.log("user:", req.body);
    var newUser = new User({
        username: req.body.username,
        password: req.body.password
    });

    newUser.save(function(err) {
        //console.log("err", err);
        if (err) res.send(err);
        res.json({ message: 'User registered successfully!', success: true});
    });
});

router.post('/login', (req, res, next) => {
    secret = "ssl"
    const query = {
      username: req.body.username, 
      password: req.body.password
    }
    User.findOne(query, (err, user) => {
        if(err) throw err;
            if(user){
            var payload = {
                _id: user._id
            };
            var options = {
                expiresIn: 604800
            };
            const token = jwt.sign(payload, secret, options);
    
            res.json({
                success: true,
                token: 'JWT '+ token,
                user: {
                    username: user.username
                }
            });
        }
    else{
        return res.json({success: false, msg: 'User not found'});
    }
  });
});


module.exports = router;
