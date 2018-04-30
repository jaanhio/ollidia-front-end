import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { CircularProgress } from 'material-ui/Progress';
import BuyMusicIcon from 'material-ui-icons/LibraryMusic';
import IconButton from 'material-ui/IconButton';
import StarIcon from 'material-ui-icons/Star';
import YouTube from 'react-youtube';
import { Link, withRouter } from 'react-router-dom';

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
  display: flex;
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
    fetchingData: false,
    followed: false,
    nomineeIndex: null
  }

  componentDidMount() {
    console.log(`props.match.url:${this.props.match.url}`);
    console.log(`props.match.params.id:${this.props.match.params.id}`);
    console.log(`followings: ${this.props.userFollowings}`);
    // scrolls to top of page
    window.scrollTo(0, 0);

    // handle loading of data
    this.setState({
      fetchingData: true
    });

    // if user is logged in, checks if nominee has already been followed
    if (localStorage.getItem('client')) {
      console.log('checking if logged in');
      this.checkFollowStatus();
    }

    // get required data for page
    const { url } = this.props.match;
    axios.get(`https://ollida-api.herokuapp.com/api/v1/${url}`)
      // axios.get(`https://57ac8db5.ngrok.io/api/v1/${url}`)
      .then(res => {
        const { data } = res;
        // console.log(data);
        // console.log(data.nominee.breakdown.digital_sales.profile_img);
        // console.log('setting state');
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
        // console.log('finished setState');
      })
      .then(() => {
        // console.log('finished fetching');
        // console.log(Object.keys(this.state.digitalSales.digital_service_providers));
        this.setState({
          fetchingData: false
        });
      })
      .then(() => {
        // responsive youtube iframe
        let youtubeFrame = document.getElementsByTagName('iframe')[0];
        if (youtubeFrame) {
          // console.log('iframe has mounted');
          // console.log(youtubeFrame);
          youtubeFrame.style.width = '100%';
          youtubeFrame.style.height = '35vh';
        }
        else {
          console.log('no frame found');
        }
      })
  }

  checkFollowStatus = () => {
    const followings = localStorage.getItem('followings') && JSON.parse(localStorage.getItem('followings'));
    console.log(followings);
    const nomineeIndex = followings.findIndex(following => {
      return following === parseInt(this.props.match.params.id, 10)
    });
    console.log(nomineeIndex);
    if (nomineeIndex > -1) {
      this.setState({
        followed: true,
        nomineeIndex: nomineeIndex
      })
    }
  }

  followClick = () => {
    // if already followed, clicking will unfollow and remove nominee from followings array in localStorage
    if (this.state.followed) {
      const followingArr = JSON.parse(localStorage.getItem('followings')).slice();
      followingArr.splice(this.state.nomineeIndex, 1);
      console.log('unfollowing');
      console.log(followingArr);
      localStorage.setItem('followings', JSON.stringify(followingArr));
      // send request to update backend
      axios.post(`https://ollida-api.herokuapp.com/api/v1/awards/1/nominees/${this.props.match.params.id}/track`, {
        track_id: '0'
      });
      this.setState({
        followed: false,
        nomineeIndex: null
      });
    }
    // if not followed, clicking will follow and add nominee to following arrays in localStorage
    else {
      // check if 'followings' arrays exist
      // if exist, make a copy of array, push new nominee id to array and replace existing array
      if (localStorage.getItem('followings')) {
        console.log('followings exist');
        const updatedFollowing = JSON.parse(localStorage.getItem('followings'));

        console.log(typeof updatedFollowing);
        console.log(typeof updatedFollowing[0]);
        console.log(typeof this.props.match.params.id);
        console.log(this.props.match.params.id);
        console.log(typeof parseInt(this.props.match.params.id, 10));
        console.log(parseInt(this.props.match.params.id, 10));
        console.log('updatedfollowing below');
        updatedFollowing.push(parseInt(this.props.match.params.id, 10));
        console.log(updatedFollowing);
        localStorage.setItem('followings', JSON.stringify(updatedFollowing));
      }
      // else create new array, push new nominee id to array and setItem to localStorage
      else {
        console.log('no followings yet');
        const updatedFollowing = [parseInt(this.props.match.params.id, 10)];
        console.log(updatedFollowing);
        debugger;
        localStorage.setItem('followings', JSON.stringify(updatedFollowing));
      }
      const followings = localStorage.getItem('followings') && JSON.parse(localStorage.getItem('followings'));
      const nomineeIndex = followings.findIndex(following => {
        return following === parseInt(this.props.match.params.id, 10)
      });
      // send request to backend to update
      axios.post(`https://ollida-api.herokuapp.com/api/v1/awards/1/nominees/${this.props.match.params.id}/track`, {
        track_id: '1'
      });
      this.setState({
        followed: true,
        nomineeIndex: nomineeIndex
      });
    }
  }

  render() {
    const { fetchingData, followed } = this.state;
    const color = followed ? 'yellow' : 'rgba(255,255,255,0.4)';
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
                <img src={this.state.artiste.profile_img} style={{ width: '100%' }} alt={this.state.artiste.name_eng}/>
                <NomineeDetails>
                  <RankDetails>
                    <h3 style={{ margin: 0, alignSelf: 'center' }}>Rank {this.state.ranking.ranking}</h3>
                    {this.props.isLoggedIn && <IconButton style={{ color: `${color}` }} onClick={this.followClick}><StarIcon /></IconButton>}
                  </RankDetails>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h5 style={{ fontWeight: 700, fontSize: '5vw', margin: 0 }}>{this.state.song.name_eng}</h5>
                    <h5 style={{ fontWeight: 200, fontSze: '1.3em', margin: 0 }}>{this.state.artiste.name_eng} | {this.state.artiste.name_kor}</h5>
                  </div>
                </NomineeDetails>
                <BreakdownSection>
                  <TitleWrapper>Digital Sales</TitleWrapper>
                  <div>
                    <img src={this.state.digitalSales.profile_img} style={{ width: '60%', objectFit: 'scale-down' }} alt='gaon-logo' />
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
                    <img src={this.state.mcountVotes.profile_img} style={{ width: '80%', objectFit: 'scale-down' }} alt='mcountdown-logo' />
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

export default withRouter(NomineePage);