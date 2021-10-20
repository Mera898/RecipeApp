const Validator = require("validator");
const isEmpty = require("is-empty");


module.exports = function validateRecipeInput(data) {
    let errors = {}

    // convert Empty fields to empty string

    data.name = !isEmpty(data.name) ? data.name :"";
    data.recipeTitle = !isEmpty(data.recipeTitle) ? data.recipeTitle:"";
    data.ingredients = !isEmpty(data.ingredients) ? data.ingredients:"";
    data.steps = !isEmpty(data.steps) ? data.steps:"";

    //Name check
    if(Validator.isEmpty(data.name)){
        errors.name = "Please input your name";
    }
    //Recipe Check
    if(Validator.isEmpty(data.recipeTitle)){
        errors.recipeTitle = "Please input recipe title";
    }
    //ingredients check
    if(Validator.isEmpty(data.ingredients)){
        errors.ingredients = "Please input recipe ingredients";
    }
    //Steps check

    if(Validator.isEmpty(data.steps)){
        errors.steps = "Please input recipe steps";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
