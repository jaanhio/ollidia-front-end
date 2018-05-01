import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import AccountCircle from 'material-ui-icons/AccountCircle';
import EditIcon from 'material-ui-icons/ModeEdit';
import DeleteIcon from 'material-ui-icons/Delete';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Tabs, { Tab } from 'material-ui/Tabs';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import UnfollowIcon from 'material-ui-icons/Star';

import IconButton from 'material-ui/IconButton';
import Modal from 'material-ui/Modal';
import Button from 'material-ui/Button';
import { baseLink } from '../link';

import Dropzone from 'react-dropzone';
import { withStyles, MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import green from 'material-ui/colors/green';
import yellow from 'material-ui/colors/yellow';
import purple from 'material-ui/colors/purple';

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

const FollowingWrapper = styled.div`
  width: 90%;
  margin: 30px auto;
`

const FollowItem = styled.div`
  display: flex;
  margin-bottom: 20px;
  background-color: white;
  padding: 0 10px;
  justify-content: flex-start;
  align-items: center;
`
const FlexItem = styled.div`
  text-align: left;
  margin-right: 20px;
  color: black;
`

const CardDetails = styled.p`
  margin-top: 0;
  font-family: 'Alegreya Sans SC', sans-serif;
`
// my listings
const PageWrapper = styled.main`
  position: relative;
  color: white;
  margin-bottom: 15vh;
`
const Section = styled.div`
  font-family: 'Alegreya Sans SC', sans-serif;
  font-weight: 200;
  color: black;
`
const Header = styled.h3`
  font-family: 'Alegreya Sans SC', sans-serif;
  text-align: left;
  font-size: 1.6em;
  font-weight: 300;
  margin-left: 17px;
`

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
  nomineeAvatar: {
    width: 80,
    height: 80,
  },
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

const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: yellow,
    tertiary: purple
  },
});

class ProfilePage extends Component {

  state = {
    value: 'one',
    userName: null,
    userAvatar: null,
    followings: [],
    activeModal: -1,
    selectedFile: null,
    listings: [],
    approved_requests: [],
    unapproved_requests: [],
    paid_requests: [],
    history: [],
  };

  // unfollow confirmation
  handleOpen = (modalIndex) => {
    this.setState({ activeModal: modalIndex })
  };

  handleClose = () => {
    this.setState({ activeModal: -1 });
  };

  handleUnfollow = (award_id, nominee_id) => {
    axios({
      method: 'post',
      url: `${baseLink}/api/v1/awards/${award_id}/nominees/${nominee_id}/track`,
      headers: {
        'access-token': localStorage.getItem('access-token'),
        'client': localStorage.getItem('client'),
        'expiry': localStorage.getItem('expiry'),
        'token-type': localStorage.getItem('token-type'),
        'uid': localStorage.getItem('uid')
      },
      data: {
        track_id: '0',
      }
    })
      .then(res => {
        this.handleClose();
        this.getFollowers();
      });
  };

  uploadAvatar = (files) => {
    let formPayLoad = new FormData();
    formPayLoad.append('uploaded_avatar', files[0])
    axios({
      method: 'post',
      url: baseLink + '/api/v1/users/avatar',
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
      this.setState({ userAvatar: response.data})
    })
  }



  // tab change
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleFileChange = (event) => {
    const file = event.target.files[0];
    this.setState({
      selectedFile: file
    });
  }

  handleFileUpload = () => {
    console.log(this.state.selectedFile);
    const formData = new FormData();
    formData.append('my-file', this.state.selectedFile);
    console.log(formData);
  }

  getFollowers = () => {
    axios({
      method: 'get',
      url: baseLink + '/api/v1/users/following',
      headers: {
        'access-token': localStorage.getItem('access-token'),
        'client': localStorage.getItem('client'),
        'expiry': localStorage.getItem('expiry'),
        'token-type': localStorage.getItem('token-type'),
        'uid': localStorage.getItem('uid')
      }
    }).then(res => {

      const { data } = res;
      this.setState({
        userName: data.user_name,
        userAvatar: data.user_avatar,
        followings: data.followings
      });
    });

    axios.get('http://localhost:3000/api/v1/myrequests').then(res => {
      const { data } = res;

      this.setState({
        approved_requests: data.requests.filter(req => req['paid'] === false && req['approved'] === true),
        unapproved_requests: data.requests.filter(req => req['paid'] === false && req['approved'] === false),
        paid_requests: data.requests.filter(req => req['paid'] === true && req['approved'] === true)
      });
    });
    axios.get('http://localhost:3000/api/v1/mylistings').then(res => {
      const { data } = res;
      this.setState({
        listings: data.listings
      });
    });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.getFollowers();
  };

  render() {
    const { classes } = this.props;
    const { value, userName, userAvatar, followings, approved_requests, unapproved_requests, paid_requests, listings } = this.state;

    const renderFollowings = followings.length !== 0 ? (
      followings.map((following, index) => {
        return (
          <FollowItem key={index}>
            <FlexItem>
              <Link to={`/awards/${following.award_id}/nominees/${following.nominee_id}`}>
                <Avatar
                  alt={following.nominee_name}
                  src={following.nominee_profile_img}
                  className={classes.nomineeAvatar}
                />
              </Link>
            </FlexItem>
            <FlexItem>
              <div>
                <h3 style={{ display: 'inline-block', marginBottom: '0', fontFamily: 'Alegreya Sans SC, sans-serif' }}>{following.award_name}</h3>
                <span >
                  <UnfollowIcon style={{ position: 'relative', top: '5px', marginLeft: '3px', color: '#ffe66b', cursor: 'pointer' }} onClick={() => this.handleOpen(index)} />
                  <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={index === this.state.activeModal}
                    onClose={this.handleClose}
                  >
                    <div className={classes.paper}>
                      <Typography variant="title" id="modal-title">
                        Unfollow this award nominee?
                      </Typography>
                      <Typography variant="subheading" id="simple-modal-description">
                        You will stop receiving notifications for this award nominee.
                      </Typography>
                      <Button variant="raised" color="secondary" className={classes.button} onClick={() => this.handleUnfollow(following.award_id, following.nominee_id)}>Unfollow</Button>
                      <Button variant="raised" color="primary" className={classes.button} onClick={this.handleClose}>Cancel</Button>
                    </div>
                  </Modal>
                </span>
              </div>
              {/*<p style={{ margin: '0', fontSize: '0.8rem', fontFamily: 'Alegreya Sans SC, sans-serif' }}>
                {following.nomination_cycle}
        </p>*/}
              <Link to={`/awards/${following.award_id}/nominees/${following.nominee_id}`} style={{ textDecoration: 'none', color: 'black', fontFamily: 'Alegreya Sans SC, sans-serif' }}>{following.nomination_cycle}</Link>
              <CardDetails>
                {following.nominee_name} - {following.song_name}
              </CardDetails>
              <CardDetails>
                rank {following.ranking}
              </CardDetails>
            </FlexItem>
          </FollowItem>
        )
      })
    ) : (
        <FollowItem>
          <FlexItem>
            <p style={{ fontFamily: 'Alegreya Sans SC, sans-serif' }}>Follow award nominees to get notifications about their current ranking!
            </p>
          </FlexItem>
        </FollowItem>
      );

    // const renderMylistings
    const renderMylistings = listings ? (

      listings.map((listing, index) => {
        return (
          <div style={{ margin: '20px 20px', backgroundColor: 'white' }}>
            <div style={{ height: '45px', textAlign: 'left', padding: '10px 10px 0px 10px', backgroundColor: '#CFD8DC' }}>
              <span style={{ marginBottom: 5 }}>Listing Posted: {listing.created_at}</span>
              <span style={{ float: 'right' }}>ID: #{listing.id}</span>
              <br></br>
              <span style={{ fontWeight: 400, paddingTop: 10 }}># of Pending Requests</span>
            </div>
            <div style={{ height: '105px', textAlign: 'left', verticalAlign: 'bottom', padding: 10, fontWeight: 200 }}>
              <div style={{ height: '100px', display: 'inline-block' }}><img style={{ maxHeight: '100%', maxWidth: '100%' }} src={listing.album_pic} /></div>

              <div style={{ verticalAlign: 'top', display: 'inline-block' }}>
                <div style={{ verticalAlign: 'top' }}>
                  <span style={{ marginLeft: 7, fontWeight: 400 }}>Album: {listing.album_name_eng}</span>
                  <br></br>
                  <span style={{ marginLeft: 7 }}>Price: ${listing.price}</span>
                </div>
                <div style={{ marginTop: 13, marginLeft: 7 }}>
                  <span style={{ marginRight: 7 }}><MuiThemeProvider theme={theme}>
                    <Link to={`/listings/${listing.id}/requests`} style={{ textDecoration: 'none', color: 'white' }} key={listing.id}><Button size="small" variant="raised" color="primary" className={classes.margin}>
                      Requests
              </Button></Link>
                  </MuiThemeProvider></span>
                  <span><IconButton style={{ padding: 0, marginLeft: -5, marginRight: -5 }} color="secondary" aria-label="edit" className={classes.button}>
                    <EditIcon size="small" />
                  </IconButton></span>
                  <span><IconButton style={{ padding: 0, marginLeft: -5, marginRight: -5 }} aria-label="delete" className={classes.button}>
                    <DeleteIcon size="small" />
                  </IconButton></span>
                </div>
              </div>

            </div>
          </div>
        )
      })
    ) : (
        <div>
          <p>there are no listings</p>
        </div>
      );

    // const renderApprovedRequests
    const renderApprovedRequests = approved_requests ? (
      approved_requests.map((request, index) => {
        return (

          <div style={{ margin: '20px 20px', backgroundColor: 'white' }}>
            <div style={{ height: '45px', textAlign: 'left', padding: '10px 10px 0px 10px', backgroundColor: '#CFD8DC' }}>
              <span style={{ marginBottom: 5 }}>Request Placed: {request.created_at}</span>
              <span style={{ float: 'right' }}>ID: #{request.id}</span>
              <br></br>
              <span style={{ fontWeight: 400, paddingTop: 10 }}># of Pending Requests</span>
            </div>
            <div style={{ height: '105px', textAlign: 'left', verticalAlign: 'bottom', padding: 10, fontWeight: 200 }}>
              <div style={{ height: '100px', display: 'inline-block' }}>Image here</div>

              <div style={{ verticalAlign: 'top', display: 'inline-block' }}>
                <div style={{ verticalAlign: 'top' }}>
                  <span style={{ marginLeft: 7, fontWeight: 400 }}>Album: Name</span>
                  <br></br>
                  <span style={{ marginLeft: 7 }}>Price: $123</span>
                  <br></br>
                  <span style={{ marginLeft: 7 }}>Sold By: Seller 123</span>
                </div>
                <div style={{ marginLeft: 7 }}>
                  <span style={{ marginRight: 7 }}><MuiThemeProvider theme={theme}>
                    <Button size="small" variant="raised" color="primary" className={classes.margin}>
                      Pay Now
              </Button>
                  </MuiThemeProvider></span>
                  <span><IconButton style={{ padding: 0, marginLeft: -5, marginRight: -5 }} aria-label="delete" className={classes.button}>
                    <DeleteIcon size="small" />
                  </IconButton></span>
                </div>
              </div>

            </div>
          </div>
        )
      })
    ) : (
        <div>
          <p>there are no approved requests</p>
        </div>
      );

    // const renderUnApprovedRequests
    const renderUnApprovedRequests = unapproved_requests ? (
      unapproved_requests.map((request, index) => {
        return (

          <div style={{ margin: '20px 20px', backgroundColor: 'white' }}>
            <div style={{ height: '45px', textAlign: 'left', padding: '10px 10px 0px 10px', backgroundColor: '#CFD8DC' }}>
              <span style={{ marginBottom: 5 }}>Request Placed: {request.created_at}</span>
              <span style={{ float: 'right' }}>ID: #{request.id}</span>
              <br></br>
              <span style={{ fontWeight: 400, paddingTop: 10 }}># of Pending Requests</span>
            </div>
            <div style={{ height: '105px', textAlign: 'left', verticalAlign: 'bottom', padding: 10, fontWeight: 200 }}>
              <div style={{ height: '100px', display: 'inline-block' }}>Image here</div>

              <div style={{ verticalAlign: 'top', display: 'inline-block' }}>
                <div style={{ verticalAlign: 'top' }}>
                  <span style={{ marginLeft: 7, fontWeight: 400 }}>Album: Name</span>
                  <br></br>
                  <span style={{ marginLeft: 7 }}>Price: $123</span>
                  <br></br>
                  <span style={{ marginLeft: 7 }}>Sold By: Seller 123</span>
                </div>
                <div style={{ marginLeft: 7 }}>
                  <span style={{ marginRight: 7 }}><MuiThemeProvider theme={theme}>
                    <Button size="small" variant="raised" color="secondary" className={classes.margin}>
                      Edit
                </Button>
                  </MuiThemeProvider></span>
                  <span><IconButton style={{ padding: 0, marginLeft: -5, marginRight: -5 }} aria-label="delete" className={classes.button}>
                    <DeleteIcon size="small" />
                  </IconButton></span>
                </div>
              </div>

            </div>
          </div>
        )
      })
    ) : (
        <div>
          <p>there are no unapproved requests</p>
        </div>
      );

    // const renderPaidRequests
    const renderPaidRequests = paid_requests ? (
      paid_requests.map((request, index) => {
        return (

          <div style={{ margin: '20px 20px', backgroundColor: 'white' }}>
            <div style={{ height: '45px', textAlign: 'left', padding: '10px 10px 0px 10px', backgroundColor: '#CFD8DC' }}>
              <span style={{ marginBottom: 5 }}>Request Placed: {request.created_at}</span>
              <span style={{ float: 'right' }}>ID: #{request.id}</span>
              <br></br>
              <span style={{ fontWeight: 400, paddingTop: 10 }}># of Pending Requests</span>
            </div>
            <div style={{ height: '105px', textAlign: 'left', verticalAlign: 'bottom', padding: 10, fontWeight: 200 }}>
              <div style={{ height: '100px', display: 'inline-block' }}>Image here</div>

              <div style={{ verticalAlign: 'top', display: 'inline-block' }}>
                <div style={{ verticalAlign: 'top' }}>
                  <span style={{ marginLeft: 7, fontWeight: 400 }}>Album: Name</span>
                  <br></br>
                  <span style={{ marginLeft: 7 }}>Price: $123</span>
                  <br></br>
                  <span style={{ marginLeft: 7 }}>Sold By: Seller 123</span>
                </div>
                <div style={{ marginLeft: 7 }}>
                  <span style={{ marginRight: 7 }}><MuiThemeProvider theme={theme}>
                    <Button size="small" variant="raised" color="secondary" className={classes.margin}>
                      Buy Again
                  </Button>
                  </MuiThemeProvider></span>
                </div>
              </div>

            </div>
          </div>
        )
      })
    ) : (
        <div>
          <p>there are no unapproved requests</p>
        </div>
      );

    return (
      <ProfilePageWrapper>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Dropzone
            accept="image/jpeg, image/png"
            multiple={false}
            onDrop={this.uploadAvatar}
            style={{border: 'none'}}
          >
            <Avatar
                alt={this.state.userName}
                src={this.state.userAvatar}
                className={classes.userAvatar}
              />
          </Dropzone>
        </div>
        <NameWrapper>{this.state.userName}</NameWrapper>
        <div >
          <AppBar position="static" style={{ textAlign: 'center', padding: '0 20px', backgroundColor: 'black' }}>
            <Tabs
              value={value}
              onChange={this.handleChange}
              classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
              scrollable
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
          {value === 'one' && <TabContainer><FollowingWrapper>{renderFollowings}</FollowingWrapper></TabContainer>}
          {value === 'two' && <TabContainer><PageWrapper>
            <Header>Your Listings</Header>
            <Section>
              {renderMylistings}
            </Section>
          </PageWrapper></TabContainer>}
          {value === 'three' && <TabContainer><PageWrapper>
            <Header>Approved</Header>
            <Section>
              {renderApprovedRequests}
            </Section>
            <Header>Unapproved</Header>
            <Section>
              {renderUnApprovedRequests}
            </Section>
          </PageWrapper></TabContainer>}
          {value === 'four' && <TabContainer><PageWrapper>
            <Header>Your Payment History</Header>
            <Section>
              {renderPaidRequests}
            </Section>
          </PageWrapper></TabContainer>}
        </div>
      </ProfilePageWrapper>
    );
  }
}

ProfilePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfilePage);
