const express = require("express");
const router = express.Router();
//const bcrypt = require("bycryptjs");
//const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const mongoose = require("mongoose")



//Load input validation

const validateRecipeInput = require("../../validation/recipe");

//Load recipe model 

const Recipe = require("../../models/Recipe");


//@route POST api/recipes/add
//@desc add recipe
//@access Public
router.post("/add",(req,res)=>{
    //Input validation
    console.log("This works!");

    const {errors, isValid} = validateRecipeInput(req.body);

    //Check Validation
    if(!isValid){
        console.log("There has been an error")
        return res.status(400).json(errors);
    }

    Recipe.findOne({recipeTitle: req.body.recipeTitle}).then(recipe=>{
        if(recipe){
            return res.status(400).json({recipeTitle: "Recipe already exists"});

        }
        else{
            console.log("adding new recipe");
            const newRecipe= new Recipe({
                name : req.body.name,
                recipeTitle : req.body.recipeTitle,
                ingredients : req.body.ingredients,
                steps : req.body.steps
            });
            newRecipe
                .save()
                .then(recipe => res.json(recipe))
                .catch(err => console.log(err));
        }

    });

});


router.get("/",(req,res)=>{
    Recipe.find({}, function(err,items){
        if(err) throw err;
        console.log(items);
        res.json(items);
    });
    /*.toArray(function(err,result){
        if(err) throw err;
        res.json(result);
    });*/
});





 
/*router("/all").get(function(req, res) {
       Recipe.find({})
       .toArray(function(err, result) {
          if (err) throw err;
          res.json(result);
       });
 });
*/
module.exports = router;


