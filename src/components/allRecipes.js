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
      <a
        href="/"
        onClick={() => {
          props.deleteRecipe(props.recipe._id);
        }}
      >
        Delete
      </a>
    </td>
  </tr>
);

export default class allRecipes extends Component {
  // This is the constructor that shall store our data retrieved from the database
  constructor(props) {
    super(props);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.state = { recipes: [] };
  }

  // This method will get the data from the database.
  componentDidMount() {
    axios
      .get("http://localhost:3000/")
      .then((response) => {
        this.setState({ recipe: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // This method will delete a recipe based on the method
  deleteRecipe(id) {
    axios.delete("http://localhost:3000/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      recipe: this.state.recipes.filter((el) => el._id !== id),
    });
  }

  // This method will map out the recipes on the table
  recipeList() {
    return this.state.recipes.map((currentrecipe) => {
      return (
        
        <Recipe
          recipe={currentrecipe}
          deleteRecipe={this.deleteRecipe}
          key={currentrecipe._id}
        />
      );
    });
  }

  // This following section will display the table with the recipes.
  render() {
    return (
      <div>
        <h3>Recipe List</h3>
        <table className="table table-striped" style={{ marginTop: 20, textAlign: "center"}}>
          <thead>
            <tr>
              <th style={{width:300}}>Cook Name</th>
              <th style={{width:300}}>Title</th>
              <th style={{width:300}}>Ingredients</th>
              <th style={{width:300}}>Steps</th>
            </tr>
          </thead>
          <tbody>{this.recipeList()}</tbody>
        </table>
      </div>
    );
  }
}