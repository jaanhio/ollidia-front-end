import React, { Component } from 'react';
import './App.css';
import NavBar from './components/Navbar';
import HomePage from './Home/HomePage';
import AwardsPage from './Awards/AwardsPage';
import Footer from './components/Footer';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/awards/:id" component={AwardsPage} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
