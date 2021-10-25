import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import { Link } from "react-router-dom";

const Recipe = (props) => (
  <tr>
    <td>{props.recipe.name}</td>
    <td>{props.recipe.recipeTitle}</td>
    <td>{props.recipe.ingredients}</td>
    <td>{props.recipe.steps}</td>

    <td>
    </td>
  </tr>
);

export default class allRecipes extends Component {
  // This is the constructor that shall store our data retrieved from the database
  constructor(props) {
    super(props);
    //this.deleteRecipe = this.deleteRecipe.bind(this);
    this.state = { recipes:[] };
  }

  // This method will get the data from the database.
  componentDidMount() {
    axios
      .get("/api/recipes")
      .then((response) => {
        this.setState({ recipes: response.data}); 
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  allRecipes= () => {
    if(this.state.recipes && this.state.recipes.length){
      return this.state.recipes.map(currentrecipe=> {
        return (
          <Recipe
            recipe={currentrecipe}
            key={currentrecipe._id}
          />
        );
        
      });
    }
    else{ return [];}
  };
  // This following section will display the table with the recipes.
  render() {
    return (
      
      <div>
        <h3>Recipe List</h3>
        <div>
        <Link
            to = "/add"
            style={{
            width:"140px",
            borderRadius:"3px",
            letterSpacing:"1.5px",
            textAlign:"right"
            }}
            > Add Recipe</Link>
        </div>
        <table className="table table-striped" style={{ marginTop: 20, textAlign: "center"}}>
          <thead>
            <tr>
              <th style={{width:300}}>Cook Name</th>
              <th style={{width:300}}>Title</th>
              <th style={{width:300}}>Ingredients</th>
              <th style={{width:300}}>Steps</th>
            </tr>
          </thead>
          <tbody>{this.allRecipes()}</tbody>
        </table>

        
      </div>
      
    );
  }
}