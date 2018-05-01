import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Select from 'material-ui/Select';
import { withStyles } from 'material-ui/styles';
import grey from 'material-ui/colors/grey';
import { Link } from 'react-router-dom';

import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

const styles = () => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  cssLabel: {
    '&$cssFocused': {
      color: grey[100],
    },
  },
  cssFocused: {},
  cssUnderline: {
    '&:after': {
      backgroundColor: grey[100],
    },
  },
});

const ListingPageWrapper = styled.main`
  position: relative;
  top: 50px;
  color: white;
  margin-bottom: 15vh;
`
const ListingSection = styled.div`
  font-family: 'Alegreya Sans SC', sans-serif;
  font-weight: 200;
  color: black;
`
const AlbumHeading = styled.h3`
  font-family: 'Alegreya Sans SC', sans-serif;
  text-align: left;
  font-size: 1.6em;
  font-weight: 300;
  margin-left: 17px;
`

const ListingsHeader = styled.h6 `
  font-family: 'Alegreya Sans SC', sans-serif;
  margin-left: 17px;
  margin-top: 10px;
  margin-bottom: 5px;
`

class ListingsPage extends Component {
  state = {
    album: {},
    listings: [],
    current_user_id: -1,
    activeDialog: -1,
    quantity: 0
  };

  handleClickOpen = (dialogIndex) => {
    this.setState({ activeDialog: dialogIndex });
  };

  handleClose = () => {
    this.setState({ activeDialog: -1 });
  };

  handleChange = event => {
    this.setState({ quantity: event.target.value });
  };

  handleRequest = (listing_id, customer_id, quantity) => {
    axios({
      method: 'post',
      url: 'http://localhost:3000/api/v1/requests',
      headers: {
        'access-token': localStorage.getItem('access-token'),
        'client': localStorage.getItem('client'),
        'expiry': localStorage.getItem('expiry'),
        'token-type': localStorage.getItem('token-type'),
        'uid': localStorage.getItem('uid')
      },
      data: {
        listing_id: listing_id,
        customer_id: customer_id,
        quantity: quantity,
        approved: false,
        paid: true
      }
    })
  };

  componentDidMount() {
    console.log(this.props.match.params.id);
    const albumId = this.props.match.params.id;
    axios({
      method: 'get',
      url: `http://localhost:3000/api/v1/albums/${albumId}/listings`,
      headers: {
        'access-token': localStorage.getItem('access-token'),
        'client': localStorage.getItem('client'),
        'expiry': localStorage.getItem('expiry'),
        'token-type': localStorage.getItem('token-type'),
        'uid': localStorage.getItem('uid')
      }
    }).then(res => {
        const { data } = res; // json file
        console.log(data);

        this.setState({
          album: data.album,
          listings: data.listings,
          current_user_id: data.current_user_id
        });
      });
  }

  render() {
    const { classes, match, fullScreen } = this.props;
    const { album, listings, current_user_id, quantity} = this.state; // to match state

    const renderListings = listings ? (
      listings.map((listing, index) => {
        return (
          <div style={{ margin: '20px 20px', backgroundColor: 'white' }}>
            <div style={{ height: '30px', textAlign: 'left', fontWeight: 400, padding: '10px 10px 0px 10px', backgroundColor: '#CFD8DC'}}>
              <span>${listing.price}</span>
              <span style={{float: 'right'}}>ID: #{listing.id}</span>
            </div>
            <div style={{ height: '50px', textAlign: 'left', verticalAlign: 'bottom', padding: 10, fontWeight: 200}}>
              <span style={{verticalAlign: 'bottom'}}>Sold by: {listing.seller_name}</span>
              <Button onClick={ () => this.handleClickOpen(index) } variant="raised" color="secondary" className={classes.button} style={{ float: 'right'}}>
                Order
              </Button>

              <Dialog
                open={index === this.state.activeDialog}
                onClose={ this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">Price: {listing.price}</DialogTitle>

                <DialogContent style={{minWidth: 280, maxWidth: 280}}>
                  <DialogContentText id="alert-dialog-description">
                  Seller Information:
                  <br></br>
                  Name: {listing.seller_name}
                  <br></br>
                  Email: {listing.seller_email}
                  </DialogContentText>
                  <br></br>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="quantity-simple">Quantity</InputLabel>
                    <Input type="number" id="quantity-simple" value={this.state.quantity} onChange={this.handleChange} />
                  </FormControl>
                </DialogContent>
                <DialogActions>
                  <Button onClick={ () => this.handleRequest(listing.id, current_user_id, quantity)} color="primary">
                    Order
                  </Button>
                </DialogActions>

              </Dialog>

            </div>
          </div>
        )
      })
    ) : (
        <div>
          <p>there are no listings</p>
        </div>
      );

      // PUTTING EVERYTHING TOGETHER INTO THE LAYOUT

    return (
      <ListingPageWrapper>
        <img src={album.profile_img} style={{ width: '100%' }} alt={album.name_eng}/>
        <AlbumHeading>Album Name: {album.name_eng}</AlbumHeading>
        <ListingsHeader style={{ textAlign: 'left', fontSize: '1.3em', fontWeight: 600 }}>All Listings</ListingsHeader>
        <ListingSection>
          {renderListings}
        </ListingSection>
      </ListingPageWrapper>
    );
  }
}

ListingsPage.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(ListingsPage);
