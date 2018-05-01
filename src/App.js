import React, { Component } from 'react';
import './App.css';
import NavBar from './components/Navbar';
import HomePage from './Home/HomePage';
import AwardsPage from './Awards/AwardsPage';
import ListingsPage from './Listings/ListingsPage';
import MyListingsPage from './Listings/MyListingsPage';
import MyRequestsPage from './Requests/MyRequestsPage';
import ListingRequestsPage from './Requests/ListingRequestsPage';
import NomineePage from './Nominee/NomineePage';
import LoginPage from './Login/LoginPage';
import PageNotFound from './components/PageNotFound';
import RegistrationPage from './Registration/RegistrationPage';
import SuccessPage from './components/SuccessPage';
import ProfilePage from './Profile/ProfilePage';
import Footer from './components/Footer';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import { baseLink } from './link';

class App extends Component {
  constructor() {
    super();
    this.state = {
      awardsList: null,
      artisteList: null,
      albumsList: null,
      isLoggedIn: false,
      userFollowings: []
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
      axios({
      method: 'get',
      url: baseLink + '/api/v1/awards',
      headers: {
        'access-token': localStorage.getItem('access-token'),
        'client': localStorage.getItem('client'),
        'expiry': localStorage.getItem('expiry'),
        'token-type': localStorage.getItem('token-type'),
        'uid': localStorage.getItem('uid')
      }}).then(res => {
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
    if (localStorage.getItem('followings')) {
      const followings = JSON.parse(localStorage.getItem('followings'));
      this.setState({
        userFollowings: followings
      });
    }
  }

  render() {
    const { awardsList, artisteList, albumsList, isLoggedIn, userFollowings } = this.state;
    return (
      <div className="App">
        <NavBar isLoggedIn={isLoggedIn} handleLogout={this.handleLogout} />
        <Switch>
          <Route path="/" exact render={() => <HomePage awardsList={awardsList} artisteList={artisteList} albumsList={albumsList} />} />
          <Route path="/login" exact render={() => <LoginPage handleLogin={this.handleLogin} />} />
          <Route path="/register" exact render={() => <RegistrationPage handleLogin={this.handleLogin} />} />
          <Route path="/register/success" exact render={() => <SuccessPage type="register" />} />
          <Route path="/login/success" exact render={() => <SuccessPage type="login" />} />
          <Route path="/logout/success" exact render={() => <SuccessPage type="logout" />} />
          <Route path="/awards/:id" exact component={AwardsPage} />
          <Route path="/awards/:id/nominees/:id" exact render={() => <NomineePage isLoggedIn={isLoggedIn} userFollowings={userFollowings} />} />
          <Route path="/users/profile" component={ProfilePage} />

          <Route path="/albums/:id/listings" exact component={ListingsPage} />
          <Route path="/mylistings" exact component={MyListingsPage} />

          <Route path="/myrequests" exact component={MyRequestsPage} />
          <Route path="/listings/:id/requests" exact component={ListingRequestsPage} />

          <Route component={PageNotFound} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
