import React, { Component } from "react";
import { CardList } from "./components/card-list/card-list.component";
import "./App.css";
import SearchBox from "./components/search-box/search-box.component";

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: "",
    };
    // Testing git changes
    // define handleChange in constructor in order to be able to access the this keyword
    // bind returns a new function where the context of 'this' can be accessed
    // can use arrow functions now so dont really need to bind
    // this.handleChanges = this.handleChanges.bind(this);
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => this.setState({ monsters: users }));
  }

  // handleChange = (e) => {
  //   // arrow funcs auto allows binding 'this' - aka 'lexical scoping'
  //   this.setState({ searchField: e.target.value });
  //   console.log(this);
  // };

  handleChange = (e) => {
    this.setState((prevState, prevProps) => {
      return { searchField: e.target.value };
    });
  };

  render() {
    // object destructuring
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter(
      (monster) =>
        monster.name.toLowerCase().includes(searchField.toLowerCase()) ||
        monster.email.toLowerCase().includes(searchField.toLowerCase())
    );
    return (
      <div className="App">
        <h1>Monsters Rolodex</h1>
        <SearchBox
          placeholder="search monsters"
          handleChange={this.handleChange}
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}
export default App;
