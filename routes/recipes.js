const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Recipe = require('../models/recipe');


router.route('/')
    .get(function(req, res) { //GET ALL
        Recipe.find(function(err, Recipes) {
            if (err) res.send(err);
            res.json(Recipes);
        });
    })
    .post(function(req, res) {
        console.log(req.body);
      var newRecipe = new Recipe({
        title: req.body.title,
        text: req.body.text,
        userId : req.body.userId
      });

      newRecipe.save(function(err) {
          console.log("err", err);
          if (err) res.send(err);
          console.log("success");
          res.json({ message: 'Recipe created successfully!'});
      });
    });

router.route('/byUser')
    .get(function(req, res) { //GET ALL
        Recipe.find({userId: mongoose.Types.ObjectId(req.query.userId)},function(err, Recipes) {
            if (err) res.send(err);
            res.json(Recipes);
        });
    });

router.route('/:recipe_id')
    .get(function(req, res) {
        Recipe.findById(req.params.recipe_id, function(err, Recipe) {
            if (err) res.send(err);
            res.json(Recipe);
        });
    })
    .put(function(req, res) {
        Recipe.findById(req.params.recipe_id, function(err, Recipe) {
            if (err) res.send(err);
            Recipe.title = req.body.title;
            Recipe.text = req.body.text;
            Recipe.save(function(err) {
                if (err) 
                    res.send(err);
                res.json({ message: 'Recipe successfully updated!' });
            });
        });
    })
    .delete(function(req, res) {
        Recipe.remove({_id: req.params.recipe_id}, function(err, message) {
            if (err) res.send(err);
            res.json({ message: 'Successfully deleted Recipe!' });
        });
    });


module.exports = router;
