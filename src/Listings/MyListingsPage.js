import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import grey from 'material-ui/colors/grey';

import Button from 'material-ui/Button';

import { withStyles, MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import green from 'material-ui/colors/green';
import yellow from 'material-ui/colors/yellow';
import purple from 'material-ui/colors/purple';

import { baseLink } from '../link';

const styles = theme => ({
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
  button: {
    margin: 2,
  },
});

const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: yellow,
    tertiary: purple
  },
});

const MyListingPageWrapper = styled.main`
  position: relative;
  top: 50px;
  color: white;
  margin-bottom: 15vh;
`
const MyListingsSection = styled.div`
  font-family: 'Alegreya Sans SC', sans-serif;
  font-weight: 200;
  color: black;
`
const ListingsHeader = styled.h3`
  font-family: 'Alegreya Sans SC', sans-serif;
  text-align: left;
  font-size: 1.6em;
  font-weight: 300;
  margin-left: 17px;
`

class MyListingsPage extends Component {
  state = {
    arg: {},
    listings: []
  }

  componentDidMount() {
      axios({
        method: 'get',
        url: baseLink + '/api/v1/mylistings/',
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
            listings: data.listings
          });
        });
  }

  render() {
    const { classes, match } = this.props;
    const {arg, listings} = this.state;

    const renderMylistings = listings ? (
      listings.map((listing, index) => {
        return (

          <div style={{ margin: '20px 20px', backgroundColor: 'white' }}>
            <div style={{ height: '45px', textAlign: 'left', padding: '10px 10px 0px 10px', backgroundColor: '#CFD8DC'}}>
              <span style={{marginBottom: 5}}>Listing Posted: {listing.created_at}</span>
              <span style={{float: 'right'}}>ID: #{listing.id}</span>
              <br></br>
              <span style={{fontWeight: 400, paddingTop: 10}}># of Pending Requests</span>
            </div>
            <div style={{ height: '105px', textAlign: 'left', verticalAlign: 'bottom', padding: 10, fontWeight: 200}}>
              <div style={{height: '100px', display: 'inline-block'}}><img style={{ maxHeight: '100%', maxWidth: '100%'}} alt="album image" src={listing.album_pic}/></div>

              <div style={{verticalAlign: 'top', display: 'inline-block'}}>
              <div style={{verticalAlign: 'top'}}>
              <span style={{marginLeft: 7, fontWeight: 400}}>Album: {listing.album_name_eng}</span>
              <br></br>
              <span style={{marginLeft: 7}}>Price: ${listing.price}</span>
              </div>
              <div style={{marginTop: 35, marginLeft: 7}}>
              <span style={{marginRight: 7}}><MuiThemeProvider theme={theme}>
                <Button size="small" variant="raised" color="primary" className={classes.margin}>
                  Requests
                </Button>
              </MuiThemeProvider></span>
              <span style={{marginRight: 7}}><MuiThemeProvider theme={theme}><Button size="small" style={{minWidth: 40, maxWidth: 40}} variant="raised" href="#flat-buttons" color="secondary" className={classes.margin}>
                Edit
              </Button></MuiThemeProvider></span>
              <span><Button size="small" variant="raised" href="#flat-buttons" color="tertiary" className={classes.margin}>
                Remove
              </Button></span>
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

      // PUTTING EVERYTHING TOGETHER INTO THE LAYOUT

    return (
      <MyListingPageWrapper>
        <ListingsHeader>Your Listings</ListingsHeader>
        <MyListingsSection>
          {renderMylistings}
        </MyListingsSection>
      </MyListingPageWrapper>
    );
  }
}


export default withStyles(styles)(MyListingsPage);
