import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { CircularProgress } from 'material-ui/Progress';

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
`;

const RankDetails = styled.div`
  font-family: 'Alegreya Sans SC', sans-serif;
  width: 50vw;
  font-size: 6vw;
  text-align: left;
`;

const TitleWrapper = styled.h4`
  font-family: 'Alegreya Sans SC', sans-serif;
  text-align: left;
  font-size: 1.6em;
  font-weight: 300;
  margin: 10px 0px;
`;

const BreakdownSection = styled.div`
  font-family: 'Alegreya Sans SC', sans-serif;
  margin: 10px 17px;
`

const Counts = styled.p`
  margin: 10px 0px;
  font-size: 10vw;
`

const Units = styled.p`
  margin: 0;
  font-size: 1.1em;
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
    fetchingData: false
  }

  componentDidMount() {
    console.log(this.props.match.url);
    this.setState({
      fetchingData: true
    });
    const { url } = this.props.match;
    axios.get(`https://ollida-api.herokuapp.com/api/v1/${url}`)
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
          // digitalSales: data.nominee.breakdown.digital_sales,
          youtubeViews: data.nominee.breakdown.youtube_views,
          mcountVotes: data.nominee.breakdown.mcountdown_votes
        });
        console.log('finished setState');
      })
      .then(() => {
        console.log('finished fetching');
        // setTimeout(() => {
        //   this.setState({
        //     fetchingData: false
        //   })
        // }, 1000);
        this.setState({
          fetchingData: false
        });
      });;
  }

  render() {
    const { nominee, fetchingData } = this.state;
    console.log(this.state.digitalSales.profile_img);
    {
      fetchingData ? (
        <div style={{ color: 'white' }}>
          <p>test</p>
        </div>
      ) : (
          <div style={{ color: 'white' }}>
            <p>nono</p>
          </div>
        )
    }
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
                    <img src={this.state.digitalSales.profile_img} style={{ width: '100%', objectFit: 'scale-down' }} />
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
                  </div>
                  <div style={{ marginTop: 30 }}>
                    <TitleWrapper>Votes</TitleWrapper>
                    <img src={this.state.mcountVotes.profile_img} style={{ width: '100%', objectFit: 'scale-down' }} />
                    <div>
                      <Counts>{this.state.mcountVotes.votes}</Counts>
                      <Units>Votes</Units>
                    </div>
                  </div>
                  <div style={{ marginTop: 30 }}>
                    <TitleWrapper>YouTube Views</TitleWrapper>
                    <div>
                      <Counts>{this.state.youtubeViews.view_cnt}</Counts>
                      <Units>Views</Units>
                    </div>
                  </div>
                </BreakdownSection>
              </div>
            )
        }
        {/*<img src={this.state.artiste.profile_img} style={{ width: '100%' }} />
        <NomineeDetails>
          <RankDetails>
            <h3 style={{ margin: 0 }}>Rank {this.state.ranking.ranking}</h3>
          </RankDetails>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h5 style={{ fontWeight: 700, fontSize: '5vw', margin: 0 }}>{this.state.song.name_eng}</h5>
            <h5 style={{ fontWeight: 200, fontSze: '1.3em', margin: 0 }}>{this.state.artiste.name_eng} | {this.state.artiste.name_kor}</h5>
          </div>
      </NomineeDetails>*/}
        {/*<div>
          <div>
            <TitleWrapper>Digital Sales</TitleWrapper>
            <img src={this.state.digitalSales.profile_img} />
            <div>
              <div>
                <p>{this.state.digitalSales.download_cnt}</p>
                <p>Downloads</p>
              </div>
              <div>
                <p>{this.state.digitalSales.stream_cnt}</p>
                <p>Streams</p>
              </div>
            </div>
          </div>
          <div>
            <TitleWrapper>Votes</TitleWrapper>
            <img src={this.state.breakdown.mcountdown_votes.profile_img} />
            <div>
              <div>
                <p>{this.state.breakdown.mcountdown_votes.votes}</p>
                <p>Votes</p>
              </div>
            </div>
          </div>
          <div>
            <TitleWrapper>YouTube Views</TitleWrapper>
          </div>
    </div>*/}
      </NomineePageWrapper>
    );
  }
}

export default NomineePage;