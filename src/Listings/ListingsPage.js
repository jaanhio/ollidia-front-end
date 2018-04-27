import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// import { award1 } from '../mockData'; // to change

import { FormControl } from 'material-ui/Form';
import { InputLabel } from 'material-ui/Input';
import Select from 'material-ui/Select';
import { withStyles } from 'material-ui/styles';
import grey from 'material-ui/colors/grey';
import { Link } from 'react-router-dom';

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
  font-family: 'Nunito', sans-serif;
  font-weight: 200;
`

// const SectionHeader = styled.div`
//   display: inline-block;
//   font-family: 'Nunito', sans-serif;
//   font-weight: 200;
//   height: 80px;
// `
//
// const SectionContent = styled.div`
//   display: inline-block;
//   font-family: 'Nunito', sans-serif;
//   font-weight: 200;
//   vertical-align: text-bottom;
//   height: 80px;
// `

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
          <div style={{ display: 'flex', margin: '10px 17px' }}>
            <div style={{ height: '80px', marginLeft: 10}}>
              <span>Price: {listing.price}  ID: {listing.id}</span>
            </div>
            <div style={{ height: '150px', marginLeft: 10}}>
              <span>Sold by: {listing.seller_id}</span>
              <button>Buy</button>
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
        <img src={album.profile_img} style={{ width: '100%' }} alt="Album Name"/>
        <h3>Album Name</h3>
        <h6 style={{ textAlign: 'left', fontSize: '1.3em', fontWeight: 600 }}>All Listings</h6>
        <ListingSection>
          {renderListings}
        </ListingSection>
      </ListingPageWrapper>
    );
  }
}

export default withStyles(styles)(ListingsPage);
