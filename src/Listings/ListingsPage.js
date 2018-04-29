import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import { FormControl } from 'material-ui/Form';
import { InputLabel } from 'material-ui/Input';
import Select from 'material-ui/Select';
import { withStyles } from 'material-ui/styles';
import grey from 'material-ui/colors/grey';
import { Link } from 'react-router-dom';

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
    listings: []
  }

  componentDidMount() {
    console.log(this.props.match.params.id);
    const albumId = this.props.match.params.id;
    axios.get(`http://localhost:3000/api/v1/albums/${albumId}/listings`)
      .then(res => {
        const { data } = res; // json file
        console.log(data);

        this.setState({
          album: data.album,
          listings: data.listings
        });
      });
  }

  render() {
    const { classes, match } = this.props;
    const { album, listings} = this.state; // to match state

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
              <Button variant="raised" href="#flat-buttons" color="secondary" className={classes.button} style={{ float: 'right'}}>
                Buy
              </Button>
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

export default withStyles(styles)(ListingsPage);
