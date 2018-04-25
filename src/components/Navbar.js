import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from '../assets/ollida_logo.jpg';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Grid from 'material-ui/Grid';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import PersonIcon from 'material-ui-icons/Person';
import BasketIcon from 'material-ui-icons/ShoppingBasket';
import { withRouter } from 'react-router-dom';


class NavBar extends Component {

  handleImgClick = () => {
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <AppBar position='fixed' style={{ backgroundColor: 'black' }}>
          <Grid container spacing={0} style={{ maxWidth: 1050 }}>
            <Grid item xs={2} sm={2} lg={2}>
              <IconButton style={{ color: 'white' }}>
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item xs={8} sm={6} lg={6}>
              <img src={logo} style={{ width: 158, height: 'auto' }} onClick={this.handleImgClick} />
            </Grid>
            <Grid item xs={1} sm={2} lg={2}>
              <IconButton style={{ color: 'white', position: 'relative', left: '-23px' }}>
                <PersonIcon />
              </IconButton>
            </Grid>
            <Grid item xs={1} sm={2} lg={2}>
              <IconButton style={{ color: 'white', position: 'relative', left: '-22px' }}>
                <BasketIcon />
              </IconButton>
            </Grid>
          </Grid>
        </AppBar>
      </div>
    )
  }
}

export default withRouter(NavBar);