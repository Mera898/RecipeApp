import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import { Link } from "react-router-dom";


export default class add extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeRecipeTitle = this.onChangeRecipeTitle.bind(this);
    this.onChangeIngredients = this.onChangeIngredients.bind(this);
    this.onChangeSteps = this.onChangeSteps.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      recipeTitle: "",
      ingredients: "",
      steps: "",
    };
  }

  // These methods will update the state properties.
  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeRecipeTitle(e) {
    this.setState({
      recipeTitle: e.target.value,
    });
  }

  onChangeIngredients(e) {
    this.setState({
      ingredients: e.target.value,
    });
  }
  onChangeSteps(e) {
    this.setState({
      steps: e.target.value,
    });
  }

// This function will handle the submission.
  onSubmit(e) {
    e.preventDefault();

    // When post request is sent to the create url, axios will add a new recipe(newrecipe) to the database.
    const newRecipe = {
      name: this.state.name,
      recipeTitle: this.state.recipeTitle,
      ingredients: this.state.ingredients,
      steps: this.state.steps
    };

    axios
      .post("/api/recipes/add", newRecipe)
      .then((res) => console.log(res.data));

    console.log(newRecipe);

    // We will empty the state after posting the data to the database
    this.setState({
      name: "",
      recipeTitle: "",
      ingredients: "",
      steps:"",
    });
  }

  // This following section will display the form that takes the input from the user.
  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <h3>Create New Recipe</h3>
        <div>
        <Link
            to = "/add"
            style={{
            width:"140px",
            borderRadius:"3px",
            letterSpacing:"1.5px",
            textAlign:"right",
            marginBottom: "20"
            }}
            > Show Recipes</Link>
        </div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name of the Cook: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </div>
          <div className="form-group">
            <label>Recipe Title: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.recipeTitle}
              onChange={this.onChangeRecipeTitle}
            />
          </div>
          <div className="form-group">
            <label>Ingredients: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.ingredients}
              onChange={this.onChangeIngredients}
            />
          </div>
          <div className="form-group">
            <label>Steps: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.steps}
              onChange={this.onChangeSteps}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create Recipe"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}