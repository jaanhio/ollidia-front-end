import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const NomineePageWrapper = styled.main`
  position: relative;
  top: 50px;
  color: white;
  margin-bottom: 15vh;
`

class NomineePage extends Component {
  state = {
    artiste: null,
    song: null,
    ranking: null,
    breakdown: null
  }

  componentDidMount() {
    console.log(this.props.match.url);
    const { url } = this.props.match;
    // axios.get(`http://e61054d0.ngrok.io/api/v1/${url}`)
    //   .then(res => {
    //     const { data } = res;
    //     console.log(data);
    //   });
  }

  render() {
    return (
      <NomineePageWrapper>
        <img src="#" />
      </NomineePageWrapper>
    );
  }
}

export default NomineePage;