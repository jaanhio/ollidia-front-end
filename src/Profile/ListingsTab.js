import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import EditIcon from 'material-ui-icons/ModeEdit';
import DeleteIcon from 'material-ui-icons/Delete';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import { baseLink } from '../link';

import { withStyles, MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import green from 'material-ui/colors/green';
import yellow from 'material-ui/colors/yellow';
import purple from 'material-ui/colors/purple';

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

const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: yellow,
    tertiary: purple
  },
});

class ListingsTab extends Component {

  state = {
    listings: []
  };

  getListings = () => {
    axios({
      method: 'get',
      url: `${baseLink()}/api/v1/mylistings`,
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

  componentDidMount() {
    window.scrollTo(0, 0);
    this.getListings();
  };

  render() {
    const { classes } = this.props;
    const { listings } = this.state;

    // const renderMylistings
    const renderMylistings = listings ? (

      listings.map((listing, index) => {
        return (
          <div key={index} style={{ margin: '20px 20px', backgroundColor: 'white' }}>
            <div style={{ height: '45px', textAlign: 'left', padding: '10px 10px 0px 10px', backgroundColor: '#CFD8DC' }}>
              <span style={{ marginBottom: 5 }}>Listing Posted: {listing.created_at}</span>
              <span style={{ float: 'right' }}>ID: #{listing.id}</span>
              <br></br>
              <span style={{ fontWeight: 400, paddingTop: 10 }}># of Pending Requests</span>
            </div>
            <div style={{ height: '105px', textAlign: 'left', verticalAlign: 'bottom', padding: 10, fontWeight: 200 }}>
              <div style={{ height: '100px', display: 'inline-block' }}><img style={{ maxHeight: '100%', maxWidth: '100%' }} src={listing.album_pic} />
              </div>
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
                      <span><IconButton style={{ padding: 0, marginLeft: -8, marginRight: -8 }} color="secondary" aria-label="edit" className={classes.button}>
                        <EditIcon size="small" />
                      </IconButton></span>
                      <span><IconButton style={{ padding: 0, marginLeft: -8, marginRight: -8 }} aria-label="delete" className={classes.button}>
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

    return (
      <PageWrapper>
            <Header>Your Listings</Header>
            <Section>
              {renderMylistings}
            </Section>
          </PageWrapper>
    );
  }
}

ListingsTab.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListingsTab);
