//import logo from './logo.svg';
import React, {Component} from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';


import Navbar from "./components/navbar";
import AllRecipes from './components/allRecipes';
import Add from './components/add';
class App extends Component {
  render() {
    return(
    <Router>
      <div className="App">
        <Navbar/>
        <Route exact path="/" component={AllRecipes}/>
        <Route exact path="/add" component={Add}/>
      </div>
    </Router>
  );
}
}

export default App;
