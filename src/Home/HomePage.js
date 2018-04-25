import React, { Component } from 'react';
import { albums, artistes, awards } from '../mockData';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import { Link } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import styled from 'styled-components';
import axios from 'axios';

const HomePageWrapper = styled.main`
  position: relative;
  top: 32px;
  height: 100vh;
  background-color: black;
  font-family: 'Alegreya Sans SC', sans-serif;
`

const TitleWrapper = styled.h4`
  color: white;
  font-size: 1.4em;
  font-weight: 100;
  text-align: left;
  margin-left: 14px;
`;

const GridWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  overflow: hidden;
`;

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      awardsList: [],
      artistesList: [],
      albumsList: []
    };
  }

  componentDidMount() {
    axios.get('http://57a3ce01.ngrok.io/api/v1/awards').then(res => {
      const { data } = res;
      this.setState({
        awardsList: data
      });
    });
  };


  render() {
    const { awardsList } = this.state;
    const renderAwards = awardsList.map((award, index) => {
      return (
        <GridListTile key={award.id} style={{ margin: '0 2.5px' }}>
          <Link to={`/awards/${award.id}`}>
            <img src={award.profile_img} style={{ width: '100%', height: '100%' }} />
          </Link>
          <GridListTileBar title={award.name} style={{ color: 'pink' }} />
        </GridListTile>
      );
    });

    const renderArtistes = artistes.map((artiste, index) => {
      return (
        <GridListTile key={artiste.img} style={{ margin: '0 2.5px' }}>
          <img src={artiste.img} />
        </GridListTile>
      );
    });

    const renderAlbums = albums.map((album, index) => {
      return (
        <GridListTile key={album.img} style={{ margin: '0 2.5px', width: '45%' }}>
          <img src={album.img} />
        </GridListTile>
      );
    });



    return (
      <HomePageWrapper>
        <div>
          <TitleWrapper>Awards</TitleWrapper>
          <GridWrapper>
            <GridList style={{ flexWrap: 'nowrap', transform: 'translateZ(0)', marginLeft: 4 }} cols={2.5}>
              {renderAwards}
            </GridList>
          </GridWrapper>
        </div>
        <div>
          <TitleWrapper>Artistes</TitleWrapper>
          <GridWrapper>
            <GridList style={{ flexWrap: 'nowrap', transform: 'translateZ(0)', marginLeft: 4 }} cols={2.5}>
              {renderArtistes}
            </GridList>
          </GridWrapper>
        </div>
        <div>
          <TitleWrapper>Albums</TitleWrapper>
          <GridWrapper>
            <GridList style={{ flexWrap: 'nowrap', transform: 'translateZ(0)', marginLeft: 4 }} cols={2.5}>
              {renderAlbums}
            </GridList>
          </GridWrapper>
        </div>
      </HomePageWrapper>
    )
  }
}

export default HomePage;