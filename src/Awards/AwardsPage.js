import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FormControl } from 'material-ui/Form';
import { InputLabel } from 'material-ui/Input';
import Select from 'material-ui/Select';
import { withStyles } from 'material-ui/styles';
import grey from 'material-ui/colors/grey';
import { Link } from 'react-router-dom';
import { CircularProgress } from 'material-ui/Progress';
import { baseLink } from '../link';

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

const AwardPageWrapper = styled.main`
  position: relative;
  top: 50px;
  color: white;
  margin-bottom: 15vh;
`

const AwardDescription = styled.p`
  font-family: 'Nunito', sans-serif;
  margin: 10px 17px;
  font-weight: 200;
  text-align: left;
`

const CriteriaSection = styled.div`
  font-family: 'Alegreya Sans SC', sans-serif;
  margin-left: 17px;
  margin-top: -24px;
`

const DateSelection = styled.div`
  margin-top: -37px;
  display: flex;
`

const ResultSection = styled.div`
  font-family: 'Nunito', sans-serif;
  font-weight: 200;
`

const ResultDetails = styled.p`
  margin: 0px 0px;
`

class AwardsPage extends Component {
  state = {
    award: {},
    nominationCycles: [],
    maxCycleID: null,
    awardNominees: [],
    selectedCycle: 2,
    selectedResults: null,
    fetchingData: false
  }

  componentDidMount() {
    console.log(this.props.match.params.id);
    this.setState({
      fetchingData: true
    });
    const awardId = this.props.match.params.id;
    axios.get(`${baseLink}/api/v1/awards/${awardId}`)
      .then(res => {
        const { data } = res;
        console.log(data);
        this.setState({
          award: data.award,
          nominationCycles: data.nomination_cycles,
          maxCycleID: data.max_cycle_id,
          awardNominees: data.nominees,
        });
      })
      .then(() => {
        this.setState({
          fetchingData: false
        });
      });
  }

  handleDateChange = e => {
    console.log(typeof this.state.awardNominees[0].cycle_id);
    console.log(typeof e.target.value);
    // filter the selected result period
    const filteredResults = this.state.awardNominees.filter(nominee => {
      return nominee.cycle_id === parseInt(e.target.value, 10);
    }).sort((a, b) => {
      return a.ranking.ranking - b.ranking.ranking;
    });
    console.log(filteredResults);
    this.setState({
      selectedCycle: e.target.value,
      selectedResults: filteredResults
    });
  }

  render() {
    const { classes } = this.props;
    const { award, selectedResults, fetchingData } = this.state;
    const renderAvailableDates = this.state.nominationCycles.map((cycle, index) => {
      return (
        <option key={cycle.id} value={cycle.id}>{cycle.start_date} - {cycle.end_date}</option>
      );
    });

    const renderResults = selectedResults ? (
      selectedResults.map((result, index) => {
        return (
          <Link to={`${this.props.match.url}/nominees/${result.nominee_id}`} style={{ textDecoration: 'none', color: 'white' }} key={result.nominee_id}>
            <div style={{ display: 'flex', margin: '10px 17px', alignItems: 'center' }}>
              <img src={result.artiste.profile_img} style={{ width: '50vw', objectFit: 'scale-down' }} alt={result.artiste.name_eng} />
              <div style={{ display: 'flex', flexDirection: 'column', height: '18vh', marginLeft: 10, width: '50vw', justifyContent: 'center' }}>
                <ResultDetails><span style={{ fontWeight: 700, fontSize: '1.8em' }}>{result.ranking.ranking}</span></ResultDetails>
                <ResultDetails>Score: {result.ranking.score}</ResultDetails>
                <ResultDetails>{result.song.name_eng} | {result.song.name_kor}</ResultDetails>
                <ResultDetails>{result.artiste.name_eng} | {result.artiste.name_kor}</ResultDetails>
              </div>
            </div>
          </Link>
        )
      })
    ) : (
        <div>
          <p>Select which results to display.</p>
        </div>
      );

    return (
      <AwardPageWrapper>
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
                <img src={award.profile_img} style={{ width: '100%' }} alt={award.name} />
                <AwardDescription>{award.description}</AwardDescription>
                <CriteriaSection>
                  <h6 style={{ textAlign: 'left', fontSize: '1.3em', fontWeight: 600 }}>Ranking table</h6>
                  <DateSelection>
                    <h6 style={{ textAlign: 'left', fontSize: '1em', fontWeight: 400, marginTop: 11 }}>Results for</h6>
                    <FormControl style={{ marginLeft: 14, position: 'relative', top: -10, fontWeight: 100 }}>
                      <InputLabel htmlFor='result-date' FormLabelClasses={{
                        root: classes.cssLabel,
                        focused: classes.cssFocused,
                      }}>Date Selection</InputLabel>
                      <Select
                        native
                        value={this.state.selectedCycle}
                        onChange={this.handleDateChange}
                        inputProps={{
                          id: 'result-date',
                        }}
                        style={{
                          color: 'white',
                          borderBottom: '1px solid white'
                        }}
                      >
                        <option value="" />
                        {renderAvailableDates}
                      </Select>
                    </FormControl>
                  </DateSelection>
                </CriteriaSection>
                <ResultSection>
                  {renderResults}
                </ResultSection>
              </div>
            )
        }
        {/*<img src={award.profile_img} style={{ width: '100%' }} alt={award.name}/>
        <AwardDescription>{award.description}</AwardDescription>
        <CriteriaSection>
          <h6 style={{ textAlign: 'left', fontSize: '1.3em', fontWeight: 600 }}>Ranking table</h6>
          <DateSelection>
            <h6 style={{ textAlign: 'left', fontSize: '1em', fontWeight: 400, marginTop: 11 }}>Results for</h6>
            <FormControl style={{ marginLeft: 14, position: 'relative', top: -10, fontWeight: 100 }}>
              <InputLabel htmlFor='result-date' FormLabelClasses={{
                root: classes.cssLabel,
                focused: classes.cssFocused,
              }}>Date Selection</InputLabel>
              <Select
                native
                value={this.state.selectedCycle}
                onChange={this.handleDateChange}
                inputProps={{
                  id: 'result-date',
                }}
                style={{
                  color: 'white',
                  borderBottom: '1px solid white'
                }}
              >
                <option value="" />
                {renderAvailableDates}
              </Select>
            </FormControl>
          </DateSelection>
        </CriteriaSection>
        <ResultSection>
          {renderResults}
              </ResultSection>*/}
      </AwardPageWrapper>
    );
  }
}

export default withStyles(styles)(AwardsPage);
