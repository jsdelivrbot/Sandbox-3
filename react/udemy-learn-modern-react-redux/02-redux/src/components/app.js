import React, { Component } from 'react';
import BookList from '../containers/book-list';
import BookDetail from '../containers/book-detail';

export default class App extends Component {
  render() {
    return (
      <div>
        <BookList />
        <BookDetail />
      </div>
    );
  }
}

// Takeaways
// 1. Redux is responsible for the application state.  The application state is one big object.
// 2. The application state managed by Redux is completely seperate from a components state, which was covered in section 1.
// 3. The application state is produced by the reducers.  A reducer is a function which returns a piece of the application state.