import React, { Component } from 'react';
import axios from 'axios';

class AwardsPage extends Component {
  constructor() {
    super();
    this.state = {
      award: {},
      nominationCycles: [],
      maxCycleID: null,
      awardNominees: []
    }
  }

  componentDidMount() {
    console.log(this.props.match.params.id);
    const awardId = this.props.match.params.id;
    axios.get(`http://57a3ce01.ngrok.io/api/v1/awards/${awardId}`)
      .then(res => {
        const { data } = res;
        this.setState({
          award: data.award,
          nominationCycles: data.nomination_cycles,
          maxCycleID: data.max_cycle_id,
          awardNominees: data.nominees
        });
      });
  }

  render() {
    const { award, nominationCycles, maxCycleID, awardNominees } = this.state;
    return (
      <div>
        <img src={award.profile_img} />
      </div>
    );
  }
}

export default AwardsPage;
