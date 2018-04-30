import React, { Component } from 'react';
import logo from '../assets/ollida_logo.jpg';
import AppBar from 'material-ui/AppBar';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import Fade from 'material-ui/transitions/Fade';
import MenuIcon from 'material-ui-icons/Menu';
import PersonIcon from 'material-ui-icons/Person';
import { withRouter, Link } from 'react-router-dom';
import styled from 'styled-components';

const NavBarWrapper = styled.nav`
  font-family: 'Alegreya Sans SC', sans-serif;
  color: white;
`

class NavBar extends Component {
  state = {
    anchorEl: null
  };

  handleImgClick = () => {
    this.props.history.push('/');
  };

  handleMenuClick = e => {
    this.setState({
      anchorEl: e.currentTarget
    });
  };

  handleMenuClose = e => {
    this.setState({
      anchorEl: null
    });
  };

  handleLogoutClick = () => {
    console.log('logging out');
    localStorage.clear();
    this.props.handleLogout();
    this.handleMenuClose();
    this.props.history.push('/logout/success');
  };

  handleProfileClick = () => {
    this.handleMenuClose();
    this.props.history.push('/users/profile');
  };

  render() {
    const { isLoggedIn, location } = this.props;
    const { anchorEl } = this.state;
    const renderLoggedInFeatures = isLoggedIn ? (
      <Grid item xs={2} sm={2} lg={2}>
        <div style={{ display: 'flex', position: 'relative', right: 13 }}>
          <IconButton
            style={{ color: 'white', position: 'relative', right: '-20px' }}
            aria-owns={anchorEl ? 'fade-menu' : null}
            aria-haspopup="true"
            onClick={this.handleMenuClick}
          >
            <PersonIcon />
          </IconButton>
          <Menu
            id='fade-menu'
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleMenuClose}
            transition={Fade}
          >
            <MenuItem onClick={this.handleProfileClick}>Profile</MenuItem>
            <MenuItem onClick={this.handleLogoutClick}>Log Out</MenuItem>
          </Menu>
        </div>
      </Grid>
    ) : (
        <Grid item xs={2} sm={2} lg={2}>
          <Link to='/login' style={{ textDecoration: 'none' }}>
            <Button style={{ color: 'white', position: 'relative', top: 5, right: 20, fontFamily: "'Alegreya Sans SC', sans-serif", fontSize: '1em', letterSpacing: '0.1em', fontWeight: 500 }}>Login</Button>
          </Link>
        </Grid>
      );
    if (location.pathname === "/login") {
      return (
        <NavBarWrapper>
          <AppBar position='fixed' style={{ backgroundColor: 'black' }}>
            <Grid container spacing={0} style={{ maxWidth: 1050 }}>
              <Grid item xs={2} sm={2} lg={2}>
                <IconButton style={{ color: 'white' }}>
                  <MenuIcon />
                </IconButton>
              </Grid>
              <Grid item xs={8} sm={6} lg={6}>
                <img src={logo} style={{ width: 158, height: 'auto' }} onClick={this.handleImgClick} alt='ollida-logo'/>
              </Grid>
            </Grid>
          </AppBar>
        </NavBarWrapper>
      )
    }
    else {
      return (
        <NavBarWrapper>
          <AppBar position='fixed' style={{ backgroundColor: 'black' }}>
            <Grid container spacing={0} style={{ maxWidth: 1050 }}>
              <Grid item xs={2} sm={2} lg={2}>
                <IconButton style={{ color: 'white' }}>
                  <MenuIcon />
                </IconButton>
              </Grid>
              <Grid item xs={8} sm={6} lg={6}>
                <img src={logo} style={{ width: 158, height: 'auto' }} onClick={this.handleImgClick} alt='ollida-logo'/>
              </Grid>
              {renderLoggedInFeatures}
            </Grid>
          </AppBar>
        </NavBarWrapper>
      )
    }
  }
}

export default withRouter(NavBar);