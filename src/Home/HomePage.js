import React, { Component } from 'react';
import { albums, artistes } from '../mockData';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HomePageWrapper = styled.main`
  position: relative;
  top: 32px;
  height: 100vh;
  background-color: black;
  font-family: 'Alegreya Sans SC', sans-serif;
  margin-bottom: 15vh;
`

const TitleWrapper = styled.h4`
  color: white;
  font-size: 1.4em;
  font-weight: 500;
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
  state = {
    awardsList: [],
    artistesList: [],
    albumsList: []
  }


  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.awardsList !== prevState.awardsList) {
      return {
        awardsList: nextProps.awardsList
      }
    }
  };

  render() {
    const { awardsList } = this.state;
    // const { awardsList } = this.props;
    // const renderAwards = awardsList.map((award, index) => {
    //   return (
    //     <GridListTile key={award.id} style={{ margin: '0 2.5px' }}>
    //       <Link to={`/awards/${award.id}`}>
    //         <img src={award.profile_img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    //       </Link>
    //       <GridListTileBar title={award.name} style={{ color: 'pink' }} />
    //     </GridListTile>
    //   );
    // });


    const renderArtistes = artistes.map((artiste, index) => {
      return (
        <GridListTile key={index} style={{ margin: '0 2.5px' }}>
          <img src={artiste.img} alt={artiste.name} />
        </GridListTile>
      );
    });

    const renderAlbums = albums.map((album, index) => {
      return (
        <GridListTile key={index} style={{ margin: '0 2.5px', width: '45%' }}>
          <img src={album.img} alt={album.name} />
        </GridListTile>
      );
    });



    return (
      <HomePageWrapper>
        <div>
          <TitleWrapper>Awardsss</TitleWrapper>
          {awardsList ? (
            <GridWrapper>
              <GridList style={{ flexWrap: 'nowrap', transform: 'translateZ(0)', marginLeft: 4 }} cols={2.5}>
                {awardsList.map((award, index) => {
                  return (
                    <GridListTile key={award.id} style={{ margin: '0 2.5px' }}>
                      <Link to={`/awards/${award.id}`}>
                        <img src={award.profile_img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={award.name} />
                      </Link>
                      <GridListTileBar title={award.name} style={{ color: 'pink' }} />
                    </GridListTile>
                  );
                })}
              </GridList>
            </GridWrapper>
          ) : (
              <div>
                <p style={{ color: 'white' }}>Waiting for data</p>
              </div>
            )}
          {/*<GridWrapper>
            <GridList style={{ flexWrap: 'nowrap', transform: 'translateZ(0)', marginLeft: 4 }} cols={2.5}>
              {renderAwards}
            </GridList>
          </GridWrapper>*/}
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