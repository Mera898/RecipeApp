const mongoose =require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const RecipeSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    recipeTitle : {
        type: String,
        required: true
    },
    ingredients :{
        type: String,
        required: true
    },
    steps:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
});

module.exports = Recipe = mongoose.model("recipes", RecipeSchema);