import React, { Component } from 'react';
import Home from './Home';

class App extends Component {
  state = {
    x: true,
  }

  render(){
    return(
      <Home/>
    )
  };
}

export default App;