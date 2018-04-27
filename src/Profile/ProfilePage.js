import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import AccountCircle from 'material-ui-icons/AccountCircle';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';

import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import UnfollowIcon from 'material-ui-icons/Star';
import IconButton from 'material-ui/IconButton';

const ProfilePageWrapper = styled.main`
  position: relative;
  top: 50px;
  height: 100vh;
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

const FollowingWrapper = styled.div`
  width: 90%;
  margin: 50px auto;
`

const FollowItem = styled.div`
  display: flex;
  margin-bottom: 20px;
  background-color: white;
  padding: 0 10px;
  border-radius: 10px;
  justify-content: flex-start;
  align-items: center;
`
const FlexItem = styled.div`
  text-align: left;
  margin-right: 20px;
  color: black;
`


function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 , color: 'white'}}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

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
  bigAvatar: {
    width: 80,
    height: 80,
  }
});

class ProfilePage extends Component {
  
  state = {
    value: 'one',
    userName: null,
    followings: []
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  componentDidMount() {
    axios.get('http://ollida-api.herokuapp.com/api/v1/users/following').then(res => {
      const { data } = res;
      this.setState({
        userName: data.user_name,
        followings: data.followings
      });
    });
  };

  render() {
    const { classes } = this.props;
    const { value, userName, followings } = this.state;
    const renderFollowings = this.state.followings.map((following, index) => {
      return (
        <FollowItem key={index}>
          <FlexItem>
            <Avatar
              alt={following.nominee_name}
              src={following.nominee_profile_img}
              className={classes.bigAvatar}
            />
          </FlexItem>
          <FlexItem>
              <div>
              <h3 style={{display: 'inline-block', marginBottom: '0', fontFamily: 'Alegreya Sans SC, sans-serif'}}>{following.award_name}</h3>
              <span style={{position: 'relative', top: '5px', left: '10px', fontFamily: 'Alegreya Sans SC, sans-serif'}}><UnfollowIcon /></span>
              </div>
              <p style={{margin: '0', fontSize: '0.8rem', fontFamily: 'Alegreya Sans SC, sans-serif'}}>
                {following.nomination_cycle}
              </p>
              <p style={{marginBottom: '0', fontFamily: 'Alegreya Sans SC, sans-serif'}}>
                {following.nominee_name} - {following.song_name}
              </p>
              <p style={{marginTop: '0', fontFamily: 'Alegreya Sans SC, sans-serif'}}>
                rank {following.ranking}
              </p>
          </FlexItem>
        </FollowItem>
      
      );
    });

    return (
      <ProfilePageWrapper>
        <AccountCircle style={{ color: 'white', fontSize: '150px' }}/>
        <NameWrapper>{this.state.userName}</NameWrapper>
          <div >
            <AppBar position="static" style={{textAlign: 'center'}}>
              <Tabs
                value={value}
                onChange={this.handleChange}
                classes={{root: classes.tabsRoot, indicator: classes.tabsIndicator}}
                centered
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
                  label="orders"
                />
                <Tab
                  value="three"
                  disableRipple
                  classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                  label="history"
                />
              </Tabs>
            </AppBar>

            {value === 'one' && <TabContainer><FollowingWrapper>{renderFollowings}</FollowingWrapper></TabContainer>}
            {value === 'two' && <TabContainer>Item Two</TabContainer>}
            {value === 'three' && <TabContainer>Item Three</TabContainer>}
          </div>
      </ProfilePageWrapper>
    );
  }
}

ProfilePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfilePage);