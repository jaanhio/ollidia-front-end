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
import Modal from 'material-ui/Modal';
import Button from 'material-ui/Button';


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
// tabs
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
  bigAvatar: {
    width: 80,
    height: 80,
  },
   paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
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
    followings: [],
    activeModal: -1
  };

  // unfollow confirmation
  handleOpen = (modalIndex) => {
    this.setState({ activeModal: modalIndex })
  };

  handleClose = () => {
    this.setState({ activeModal: -1 });
  };

  handleUnfollow = (award_id, nominee_id) => {
    axios
      .post(`http://localhost:3001/api/v1/awards/${award_id}/nominees/${nominee_id}/track`, {
          track_id: 1
        })
      .then(res => {
          this.handleClose();
          window.location.reload();
        })
  };

  // tab change
  handleChange = (event, value) => {
    this.setState({ value });
  };

  componentDidMount() {
    axios.get('http://localhost:3001/api/v1/users/following').then(res => {
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
    const renderFollowings = followings.length != 0 ? (
      followings.map((following, index) => {
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
                <span >
                  <UnfollowIcon style={{ position: 'relative', top: '5px', marginLeft: '3px', color: '#ffe66b', cursor: 'pointer'}} onClick={ () => this.handleOpen(index) } />
                  <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={ index === this.state.activeModal}
                    onClose={this.handleClose}
                  >
                    <div className={classes.paper}>
                      <Typography variant="title" id="modal-title">
                        Unfollow this award nominee?
                      </Typography>
                      <Typography variant="subheading" id="simple-modal-description">
                        You will stop receiving notifications for this award nominee.
                      </Typography>
                      <Button variant="raised" color="secondary" className={classes.button} onClick={ () => this.handleUnfollow(following.award_id, following.nominee_id) }>Unfollow</Button>
                      <Button variant="raised" color="primary" className={classes.button} onClick={this.handleClose}>Cancel</Button>
                    </div>
                  </Modal>
                </span>
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
        )
      })
    ) : (
        <FollowItem>
          <FlexItem>
            <p style={{fontFamily: 'Alegreya Sans SC, sans-serif'}}>Follow award nominees to get notifications about their current ranking!
            </p>
          </FlexItem>
        </FollowItem>
      );
    

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