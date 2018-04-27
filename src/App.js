import React, { Component } from 'react';
import './App.css';
import NavBar from './components/Navbar';
import HomePage from './Home/HomePage';
import AwardsPage from './Awards/AwardsPage';
import NomineePage from './Nominee/NomineePage';
import LoginPage from './Login/LoginPage';
import RegistrationPage from './Registration/RegistrationPage';
import RegistrationSuccessPage from './Registration/RegistrationSuccess';
import ProfilePage from './Profile/ProfilePage';
import Footer from './components/Footer';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      awardsList: [],
      artisteList: [],
      albumsList: [],
      isLoggedIn: false
    };
  }

  handleLogin = () => {
    this.setState({
      isLoggedIn: true
    });
  };

  componentDidMount() {
    axios.get('https://ollida-api.herokuapp.com/api/v1/awards').then(res => {
      const { data } = res;
      this.setState({
        awardsList: data
      });
    });
  }

  render() {
    return (
      <div className="App">
        <NavBar isLoggedIn={this.state.isLoggedIn} />
        <Switch>
          <Route path="/" exact render={() => <HomePage awardsList={this.state.awardsList} artisteList={this.state.artisteList} albumsList={this.state.albumsList} />} />
          <Route path="/login" exact render={() => <LoginPage />} />
          <Route path="/register" exact render={() => <RegistrationPage handleLogin={this.handleLogin}/>} />
          <Route path="/register/success" exact component={RegistrationSuccessPage} />
          <Route path="/awards/:id" exact component={AwardsPage} />
          <Route path="/awards/:id/nominee/:id" component={NomineePage} />
          <Route path="/users/following" component={ProfilePage} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
