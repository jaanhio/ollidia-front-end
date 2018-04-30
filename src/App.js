import React, { Component } from 'react';
import './App.css';
import NavBar from './components/Navbar';
import HomePage from './Home/HomePage';
import AwardsPage from './Awards/AwardsPage';
import ListingsPage from './Listings/ListingsPage';
import MyListingsPage from './Listings/MyListingsPage';
import NomineePage from './Nominee/NomineePage';
import LoginPage from './Login/LoginPage';
import RegistrationPage from './Registration/RegistrationPage';
import RegistrationSuccessPage from './Registration/RegistrationSuccess';
import ProfilePage from './Profile/ProfilePage';
import LoginSuccessPage from './Login/LoginSuccess';
import LogoutSuccessPage from './Login/LogoutSuccess';
import Footer from './components/Footer';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      awardsList: null,
      artisteList: null,
      albumsList: null,
      isLoggedIn: false
    };
  }

  handleLogin = () => {
    this.setState({
      isLoggedIn: true
    });
  };

  handleLogout = () => {
    this.setState({
      isLoggedIn: false
    });
  }

  componentDidMount() {
    axios.get('https://ollida-api.herokuapp.com/api/v1/awards').then(res => {
      const { data } = res;
      this.setState({
        awardsList: data
      });
    });
    if (localStorage.getItem('client')) {
      this.setState({
        isLoggedIn: true
      });
    }
  }

  render() {
    return (
      <div className="App">
        <NavBar isLoggedIn={this.state.isLoggedIn} handleLogout={this.handleLogout} />
        <Switch>
          <Route path="/" exact render={() => <HomePage awardsList={this.state.awardsList} artisteList={this.state.artisteList} albumsList={this.state.albumsList} />} />
          <Route path="/login" exact render={() => <LoginPage handleLogin={this.handleLogin} />} />
          <Route path="/register" exact render={() => <RegistrationPage handleLogin={this.handleLogin} />} />
          <Route path="/register/success" exact component={RegistrationSuccessPage} />
          <Route path="/login/success" exact component={LoginSuccessPage} />
          <Route path="/logout/success" exact component={LogoutSuccessPage} />
          <Route path="/awards/:id" exact component={AwardsPage} />
          <Route path="/awards/:id/nominees/:id" component={NomineePage} />
          <Route path="/users/profile" component={ProfilePage} />
          
          <Route path="/albums/:id/listings" exact component={ListingsPage} />
          <Route path="/mylistings" exact component={MyListingsPage} />

        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
