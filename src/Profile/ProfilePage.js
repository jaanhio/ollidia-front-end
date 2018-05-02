import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import AccountCircle from 'material-ui-icons/AccountCircle';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Tabs, { Tab } from 'material-ui/Tabs';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { baseLink } from '../link';
import Dropzone from 'react-dropzone';
import { withStyles } from 'material-ui/styles';

import FollowingsTab from './FollowingsTab';
import ListingsTab from './ListingsTab';
import OrdersTab from './OrdersTab';
import HistoryTab from './HistoryTab';
import Checkout from '../Requests/Checkout';

const ProfilePageWrapper = styled.main`
  position: relative;
  top: 50px;
  background-color: black;
  font-family: 'Alegreya Sans SC', sans-serif;
  margin-bottom: 15vh;
`;

const NameWrapper = styled.h4`
  color: white;
  font-size: 1.8em;
  font-weight: 100;
  margin-top: 0;
  margin-bottom: 0;
`;

// tabs
function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: '0 24px', color: 'white' }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

// MUI styles
const styles = theme => ({
  tabsRoot: {
    backgroundColor: 'black',
  },
  tabsIndicator: {
    backgroundColor: 'white',
  },
  tabRoot: {
    marginRight: theme.spacing.unit * 3,
    '&:hover': {
      color: 'white',
      opacity: 1,
    },
    '&$tabSelected': {
      color: 'white'
    },
    '&:focus': {
      color: 'white',
    },
  },
  tabSelected: {},
  userAvatar: {
    width: 120,
    height: 120,
  },
  paper: {
    position: 'absolute',
    width: '70vw',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    // padding: '0 24px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  button: {
    margin: theme.spacing.unit,
  }
});

class ProfilePage extends Component {

  state = {
    value: 'one',
    userName: null,
    userAvatar: null
  };

  uploadAvatar = (files) => {
    let formPayLoad = new FormData();
    formPayLoad.append('uploaded_avatar', files[0])
    axios({
      method: 'post',
      url:  `${baseLink()}/api/v1/users/avatar`,
      headers: {
        'access-token': localStorage.getItem('access-token'),
        'client': localStorage.getItem('client'),
        'expiry': localStorage.getItem('expiry'),
        'token-type': localStorage.getItem('token-type'),
        'uid': localStorage.getItem('uid')
      },
      data: formPayLoad
    })
      .then(response => {
        this.setState({ userAvatar: response.data })
      })
  }

  // tab change
  handleChange = (event, value) => {
    this.setState({ value });
  };

  getUserInfo = () => {
    axios({
      method: 'get',

      url: `${baseLink()}/api/v1/users/info`,

      headers: {
        'access-token': localStorage.getItem('access-token'),
        'client': localStorage.getItem('client'),
        'expiry': localStorage.getItem('expiry'),
        'token-type': localStorage.getItem('token-type'),
        'uid': localStorage.getItem('uid')
      }
    })
      .then(res => {
        const { data } = res;
        this.setState({
          userName: data.user_name,
          userAvatar: data.user_avatar
        });
      });
  };

  componentDidMount() {
    // debugger
    window.scrollTo(0, 0);
    this.getUserInfo();
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <ProfilePageWrapper>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Dropzone
            accept="image/jpeg, image/png"
            multiple={false}
            onDrop={this.uploadAvatar}
            style={{ border: 'none' }}
          >
            {this.state.userAvatar == 'n/a'
              ? <AccountCircle style={{ color: 'white', fontSize: '120px' }} />
              : <Avatar
                alt={this.state.userName}
                src={this.state.userAvatar}
                className={classes.userAvatar}
              />
            }
          </Dropzone>
        </div>
        <NameWrapper>{this.state.userName}</NameWrapper>
        <div>
          <AppBar position="static" style={{ padding: '0 20px', backgroundColor: 'black' }}>
            <Tabs
              value={value}
              onChange={this.handleChange}
              classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
              scrollable
            >
              <Tab
                value="one"
                disableRipple
                classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                label="following"
              />
              <Tab
                value="two"
                disableRipple
                classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                label="listings"
              />
              <Tab
                value="three"
                disableRipple
                classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                label="orders"
              />
              <Tab
                value="four"
                disableRipple
                classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                label="history"
              />
            </Tabs>
          </AppBar>
          {value === 'one' && <TabContainer><FollowingsTab /></TabContainer>}
          {value === 'two' && <TabContainer><ListingsTab /></TabContainer>}
          {value === 'three' && <TabContainer><OrdersTab /></TabContainer>}
          {value === 'four' && <TabContainer><HistoryTab /></TabContainer>}
        </div>
      </ProfilePageWrapper>
    );
  }
}

ProfilePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfilePage);
