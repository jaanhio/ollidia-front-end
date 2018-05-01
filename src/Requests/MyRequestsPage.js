import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import { FormControl } from 'material-ui/Form';
import { InputLabel } from 'material-ui/Input';
import Select from 'material-ui/Select';

import grey from 'material-ui/colors/grey';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from 'material-ui/Button';
import EditIcon from 'material-ui-icons/ModeEdit';
import DeleteIcon from 'material-ui-icons/Delete';

// import Icon from 'material-ui/Icon';
// import IconButton from 'material-ui/IconButton';
import { withStyles, MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import green from 'material-ui/colors/green';
import yellow from 'material-ui/colors/yellow';
import purple from 'material-ui/colors/purple';

const styles = theme => ({
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
  button: {
    margin: 2,
  },
});

const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: yellow,
    tertiary: purple
  },
});

const MyRequestsPageWrapper = styled.main`
  position: relative;
  top: 50px;
  color: white;
  margin-bottom: 15vh;
`
const MyRequestsSection = styled.div`
  font-family: 'Alegreya Sans SC', sans-serif;
  font-weight: 200;
  color: black;
`
const RequestsHeader = styled.h3`
  font-family: 'Alegreya Sans SC', sans-serif;
  text-align: left;
  font-size: 1.6em;
  font-weight: 300;
  margin-left: 17px;
`

class MyRequestsPage extends Component {
  state = {
    arg: {},
    requests: []
  }

  componentDidMount() {
    axios.get('http://localhost:3000/api/v1/myrequests/')
      .then(res => {
        const { data } = res; // json file
        console.log(data);
        this.setState({
          requests: data.requests
        });
      });
  }

  render() {
    const { classes, match } = this.props;
    const {arg, requests} = this.state;

    const renderMyrequests = requests ? (
      requests.map((request, index) => {
        return (

          <div style={{ margin: '20px 20px', backgroundColor: 'white' }}>
            <div style={{ height: '45px', textAlign: 'left', padding: '10px 10px 0px 10px', backgroundColor: '#CFD8DC'}}>
              <span style={{marginBottom: 5}}>Request Placed: {request.created_at}</span>
              <span style={{float: 'right'}}>ID: #{request.id}</span>
              <br></br>
              <span style={{fontWeight: 400, paddingTop: 10}}># of Pending Requests</span>
            </div>
            <div style={{ height: '105px', textAlign: 'left', verticalAlign: 'bottom', padding: 10, fontWeight: 200}}>
              <div style={{height: '100px', display: 'inline-block'}}>Image here</div>

              <div style={{verticalAlign: 'top', display: 'inline-block'}}>
              <div style={{verticalAlign: 'top'}}>
              <span style={{marginLeft: 7, fontWeight: 400}}>Album: Name</span>
              <br></br>
              <span style={{marginLeft: 7}}>Price: $123</span>
              <br></br>
              <span style={{marginLeft: 7}}>Sold By: Seller 123</span>
              </div>
              <div style={{marginTop: 35, marginLeft: 7}}>
              <span style={{marginRight: 7}}><MuiThemeProvider theme={theme}>
                <Button size="small" variant="raised" color="primary" className={classes.margin}>
                  Pay Now
                </Button>
              </MuiThemeProvider></span>
              <span><Button size="small" variant="raised" href="#flat-buttons" color="tertiary" className={classes.margin}>
                Remove
              </Button></span>
              </div>
              </div>

            </div>
          </div>
        )
      })
    ) : (
        <div>
          <p>there are no requests</p>
        </div>
      );

      // PUTTING EVERYTHING TOGETHER INTO THE LAYOUT

    return (
      <MyRequestsPageWrapper>
        <RequestsHeader>Your Requests</RequestsHeader>
        <MyRequestsSection>
          {renderMyrequests}
        </MyRequestsSection>
      </MyRequestsPageWrapper>
    );
  }
}


export default withStyles(styles)(MyRequestsPage);