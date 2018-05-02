import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import UnfollowIcon from 'material-ui-icons/Star';
import { withStyles } from 'material-ui/styles';
import Modal from 'material-ui/Modal';
import Button from 'material-ui/Button';
import { baseLink } from '../link';

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
const styles = theme => ({
  nomineeAvatar: {
    width: 80,
    height: 80,
  },
  paper: {
    position: 'absolute',
    width: '70vw',
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

class FollowingsTab extends Component {

  state = {
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
        followings: data.followings
      });
    });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.getFollowers();
  };

  render() {
    const { classes } = this.props;
    const { value, followings } = this.state;

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

    return (
      <FollowingWrapper>{renderFollowings}</FollowingWrapper>
    );
  }
}

FollowingsTab.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FollowingsTab);
