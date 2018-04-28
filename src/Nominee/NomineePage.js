import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { CircularProgress } from 'material-ui/Progress';
import BuyMusicIcon from 'material-ui-icons/LibraryMusic';
import YouTube from 'react-youtube';
import { Link } from 'react-router-dom';

const NomineePageWrapper = styled.main`
  position: relative;
  top: 50px;
  color: white;
  margin-bottom: 15vh;
`;

const NomineeDetails = styled.div`
  font-family: 'Nunito', sans-serif;
  display: flex;
  margin: 10px 25px;
  align-items: center;
  flex-direction: column;
`;

const RankDetails = styled.div`
  font-family: 'Alegreya Sans SC', sans-serif;
  font-size: 6vw;
  text-align: left;
`;

const TitleWrapper = styled.h4`
  font-family: 'Alegreya Sans SC', sans-serif;
  text-align: center;
  font-size: 1.6em;
  font-weight: 300;
  margin: 10px 0px;
`;

const BreakdownSection = styled.div`
  font-family: 'Alegreya Sans SC', sans-serif;
  margin: 30px 17px;
`

const Counts = styled.p`
  margin: -4px 0px;
  font-size: 10vw;
`

const Units = styled.p`
  margin: 0;
  font-size: 1.1em;
`

const ProviderLinks = styled.a`
  color: white;
  margin: 0 10px;
  font-size: 1.3em;
`
const YouTubeSection = styled.div`
  margin-top: 11vh;
`

const MCountSection = styled.div`
  margin-top: 11vh;
`

const AlbumSection = styled.div`
  margin-top: 11vh;
`


class NomineePage extends Component {
  state = {
    artiste: [],
    song: [],
    ranking: [],
    breakdown: [],
    nominee: [],
    digitalSales: [],
    youtubeViews: [],
    mcountVotes: [],
    album: [],
    fetchingData: false
  }

  componentDidMount() {
    console.log(this.props.match.url);
    this.setState({
      fetchingData: true
    });
    const { url } = this.props.match;
    // axios.get(`https://ollida-api.herokuapp.com/api/v1/${url}`)
    axios.get(`https://57ac8db5.ngrok.io/api/v1/${url}`)
      .then(res => {
        const { data } = res;
        console.log(data);
        console.log(data.nominee.breakdown.digital_sales.profile_img);
        console.log('setting state');
        this.setState({
          digitalSales: data.nominee.breakdown.digital_sales,
          artiste: data.nominee.artiste,
          breakdown: data.nominee.breakdown,
          ranking: data.nominee.ranking,
          song: data.nominee.song,
          nominee: data.nominee,
          album: data.nominee.breakdown.album_volume,
          // digitalSales: data.nominee.breakdown.digital_sales,
          youtubeViews: data.nominee.breakdown.youtube_views,
          mcountVotes: data.nominee.breakdown.mcountdown_votes
        });
        console.log('finished setState');
      })
      .then(() => {
        console.log('finished fetching');
        console.log(Object.keys(this.state.digitalSales.digital_service_providers));
        this.setState({
          fetchingData: false
        });
      })
      .then(() => {
        // responsive youtube iframe
        let youtubeFrame = document.getElementsByTagName('iframe')[0];
        if (youtubeFrame) {
          console.log('iframe has mounted');
          console.log(youtubeFrame);
          youtubeFrame.style.width = '100%';
          youtubeFrame.style.height = '35vh';
        }
        else {
          console.log('no frame found');
        }
      })
  }

  render() {
    const { nominee, fetchingData } = this.state;
    console.log(this.state.digitalSales.digital_service_providers);
    // const providersArray = Object.keys(this.state.digitalSales.digitalSales);
    // console.log(providersArray);
    // const renderDigitalServer = () => {
    //   for ()
    // }

    return (
      <NomineePageWrapper>
        {
          fetchingData ? (
            <div style={{
              display: 'flex',
              height: '100vh',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <CircularProgress style={{ width: '20vw', height: '20vw' }} />
            </div>
          ) : (
              <div>
                <img src={this.state.artiste.profile_img} style={{ width: '100%' }} />
                <NomineeDetails>
                  <RankDetails>
                    <h3 style={{ margin: 0 }}>Rank {this.state.ranking.ranking}</h3>
                  </RankDetails>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h5 style={{ fontWeight: 700, fontSize: '5vw', margin: 0 }}>{this.state.song.name_eng}</h5>
                    <h5 style={{ fontWeight: 200, fontSze: '1.3em', margin: 0 }}>{this.state.artiste.name_eng} | {this.state.artiste.name_kor}</h5>
                  </div>
                </NomineeDetails>
                <BreakdownSection>
                  <TitleWrapper>Digital Sales</TitleWrapper>
                  <div>
                    <img src={this.state.digitalSales.profile_img} style={{ width: '60%', objectFit: 'scale-down' }} />
                    <div style={{ width: '100%', display: 'flex', }}>
                      <div style={{ width: '50%' }}>
                        <Counts>{this.state.digitalSales.download_cnt}</Counts>
                        <Units>Downloads</Units>
                      </div>
                      <div style={{ width: '50%' }}>
                        <Counts>{this.state.digitalSales.stream_cnt}</Counts>
                        <Units>Streams</Units>
                      </div>
                    </div>
                    <div>
                      <h4 style={{ marginBottom: 0 }}>Listen on:</h4>
                      <div>
                        {this.state.digitalSales.digital_service_providers && (
                          Object.keys(this.state.digitalSales.digital_service_providers).map((provider, index) => {
                            return (
                              <ProviderLinks href={this.state.digitalSales.digital_service_providers[provider]} key={provider} target='_blank'>{provider}</ProviderLinks>
                            );
                          })
                        )}
                      </div>
                    </div>
                  </div>
                  <AlbumSection>
                    <TitleWrapper>Album</TitleWrapper>
                    <h4 style={{ marginBottom: 0 }}>Buy album:</h4>
                    <Link to={`/albums/${this.state.song.album_id}/listings`} style={{ color: 'white', position: 'relative', top: 10 }}><BuyMusicIcon /></Link>
                  </AlbumSection>
                  <MCountSection>
                    <TitleWrapper>Votes</TitleWrapper>
                    <img src={this.state.mcountVotes.profile_img} style={{ width: '80%', objectFit: 'scale-down' }} />
                    <div>
                      <Counts>{this.state.mcountVotes.votes}</Counts>
                      <Units>Votes</Units>
                    </div>
                  </MCountSection>
                  <YouTubeSection>
                    <TitleWrapper>YouTube Views</TitleWrapper>
                    <div>
                      <YouTube
                        videoId={this.state.youtubeViews.video_id}
                        opts={{
                          height: '390',
                          width: '640',
                          playerVars: {
                            autoplay: 1
                          }
                        }}
                      />
                    </div>
                    <div>
                      <Counts>{this.state.youtubeViews.view_cnt}</Counts>
                      <Units>Views</Units>
                    </div>
                  </YouTubeSection>
                </BreakdownSection>
              </div>
            )
        }
      </NomineePageWrapper>
    );
  }
}

export default NomineePage;