import React, { Component } from 'react';

// define a functional component, it is called this because it is literally a function
// and is considered a 'dumb' component in that it simply returns some JSX and nothing more
// functional components do not have state
// the component 'App' below is an example functional component, it returns all the other components such as the class-based component SearchBar (see below)
// const App = () => {
//   return (
//    <div>
//      <SearchBar />;
//    </div>
//   );
// }

// define a class-based component, a class-based component can have properties and methods
// and generally be considered a 'smarter' component
// we extend React.Component to get some extra React-based functionality
// each class-based component has it's own state object - when the components state is changed the component immediately re-renders, and forces it's children to re-render as well.
class SearchBar extends Component {
  constructor(props) {
    super(props);

    // this is only time we set state in this way when we initialise it
    // every other time we should use this.setState (see the event onInputChange)
    this.state = { 
      term: ''
    };
  }

  // every class-based react component must have a render method
  // this method is what is rendered in the DOM by returning some JSX
  render() {
    // here we return an input element with an event which fires when the value changes
    // input is a controlled component because it's value is being set by state, it's value will only change when the state changes
    // by using it as a controlled component we are giving control to state.
    // in this example, we are not changing the value of the input field we are actually changing the value of state when the event fires, the value of the input is then set to a value from the state object because when the state changes, the component is re-rendered.
    // this has a benefit of allowing us to easily read the value of the input field, because we can simply read the value of this.state.term, rather than using jQuery to get the input field, then get its value.
    return (
      <div className="search-bar">
        <input 
          value={this.state.term}
          onChange={event => this.onInputChange(event.target.value)} />
      </div>
    );
  }

  // events
  // in React event methods have a naming convention of 'onInputChange' or 'handleInputChange'.
  // it has the structure 
    // [on|handle] which means whenever something happens (i.e. the event)
    // [tag] which is the tag to target so in this case the input tag
    // [event] so in this case 'change' 
    // [on|handle][tag][event] - onInputChange which means whenever the input changes.
  onInputChange(term) {
    // update the state by using this.setState
    // we never use things like this.state.term = "BAD!!" to update a value
    // we use this.setState and pass a new object which is a representation of the state
    this.setState({ term });
    this.props.onSearchTermChange(term);
  }
}

export default SearchBar;
