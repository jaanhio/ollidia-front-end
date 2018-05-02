import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import grey from 'material-ui/colors/grey';

import Button from 'material-ui/Button';

import { withStyles, MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import green from 'material-ui/colors/green';
import yellow from 'material-ui/colors/yellow';
import purple from 'material-ui/colors/purple';

import { baseLink } from '../link';

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

const PageWrapper = styled.main`
  position: relative;
  top: 50px;
  color: white;
  margin-bottom: 15vh;
`
const Section = styled.div`
  font-family: 'Alegreya Sans SC', sans-serif;
  font-weight: 200;
  color: black;
`
const Header = styled.h3`
  font-family: 'Alegreya Sans SC', sans-serif;
  text-align: left;
  font-size: 1.6em;
  font-weight: 300;
  margin-left: 17px;
`

class ListingRequestsPage extends Component {
  state = {
    arg: {},
    unapproved_requests: [],
    unpaid_requests: []
  }

  handleRequest = (request_id, customer_id, listing_id, quantity) => {
    axios({
      method: 'patch',
      url: baseLink() + '/api/v1/myrequests',
      headers: {
        'access-token': localStorage.getItem('access-token'),
        'client': localStorage.getItem('client'),
        'expiry': localStorage.getItem('expiry'),
        'token-type': localStorage.getItem('token-type'),
        'uid': localStorage.getItem('uid')
      },
      data: {
        id: request_id,
        customer_id: customer_id,
        listing_id: listing_id,
        quantity: quantity,
        approved: true,
        paid: false
      }
    }).then(res => {
      this.props.history.push('/')
    });
  };

  componentDidMount() {
    const listingId = this.props.match.params.id;
    axios.get(`http://localhost:3000/api/v1/listings/${listingId}/requests`)
      .then(res => {
        const { data } = res; // json file
        console.log(data);
        this.setState({
          unpaid_requests: data.requests.filter(req => req['paid'] === false && req['approved'] === true),
          unapproved_requests: data.requests.filter(req => req['paid'] === false && req['approved'] === false),
        });
      });
  }

  render() {
    const { classes, match } = this.props;
    const {arg, unpaid_requests, unapproved_requests} = this.state;

    const renderUnApprovedRequests = unapproved_requests ? (
      unapproved_requests.map((request, index) => {
        return (

          <div style={{ margin: '5px 5px', backgroundColor: 'white' }}>
            <div style={{ height: '45px', textAlign: 'left', padding: '10px 10px 0px 10px', backgroundColor: '#CFD8DC'}}>
              <span style={{marginBottom: 5}}>Request Placed: {request.created_at}</span>
              <span style={{float: 'right'}}>ID: #{request.id}</span>
              <br></br>
              <span style={{fontWeight: 400, paddingTop: 10}}>Total Charge: ${request.total_price}, Quantity: {request.quantity}</span>
            </div>
            <div style={{ height: '120px', textAlign: 'left', verticalAlign: 'bottom', padding: 10, fontWeight: 200}}>
              <div style={{height: '100px', display: 'inline-block'}}><img style={{ maxHeight: '100%', maxWidth: '100%'}} alt="album image" src={request.album_pic}/></div>

              <div style={{verticalAlign: 'top', display: 'inline-block'}}>
              <div style={{verticalAlign: 'top'}}>
              <span style={{marginLeft: 7, fontWeight: 400}}>Album: {request.album_name}</span>
              <br></br>
              <span style={{marginLeft: 7}}>Customer Information:</span>
              <br></br>
              <span style={{marginLeft: 7}}>Name: {request.customer_name}</span>
              <br></br>
              <span style={{marginLeft: 7}}>Email: {request.customer_email}</span>
              </div>
              <div style={{marginTop: 15, marginLeft: 7}}>
              <span style={{marginRight: 7}}><MuiThemeProvider theme={theme}>
                <Button onClick={ () => this.handleRequest(request.id, request.customer_id, request.listing_id, request.quantity)} size="small" variant="raised" color="primary" className={classes.margin}>
                  Approve
                </Button>
              </MuiThemeProvider></span>
              <span style={{marginRight: 0}}><MuiThemeProvider theme={theme}>
                <Button size="small" variant="raised" color="tertiary" className={classes.margin}>
                  Deny
                </Button>
              </MuiThemeProvider></span>
              </div>
              </div>

            </div>
          </div>
        )
      })
    ) : (
        <div>
          <p>there are no unapproved requests</p>
        </div>
      );

      const renderUnpaidRequests = unpaid_requests ? (
        unpaid_requests.map((request, index) => {
          return (

            <div style={{ margin: '20px 20px', backgroundColor: 'white' }}>
              <div style={{ height: '45px', textAlign: 'left', padding: '10px 10px 0px 10px', backgroundColor: '#CFD8DC'}}>
                <span style={{marginBottom: 5}}>Request Placed: {request.created_at}</span>
                <span style={{float: 'right'}}>ID: #{request.id}</span>
                <br></br>
                <span style={{fontWeight: 400, paddingTop: 10}}>Total Charge: ${request.total_price}, Quantity: {request.quantity}</span>
              </div>
              <div style={{ height: '120px', textAlign: 'left', verticalAlign: 'bottom', padding: 10, fontWeight: 200}}>
                <div style={{height: '100px', display: 'inline-block'}}><img style={{ maxHeight: '100%', maxWidth: '100%'}} alt="album image" src={request.album_pic}/></div>

                <div style={{verticalAlign: 'top', display: 'inline-block'}}>
                <div style={{verticalAlign: 'top'}}>
                <span style={{marginLeft: 7, fontWeight: 400}}>Album: {request.album_name}</span>
                <br></br>
                <span style={{marginLeft: 7}}>Customer Information:</span>
                <br></br>
                <span style={{marginLeft: 7}}>Name: Customer Name</span>
                <br></br>
                <span style={{marginLeft: 7}}>Email: Customer Email</span>
                </div>
                <div style={{marginTop: 15, marginLeft: 7}}>
                <span style={{marginRight: 7}}><MuiThemeProvider theme={theme}>
                  <Button size="small" variant="raised" color="primary" className={classes.margin}>
                    Deny
                  </Button>
                </MuiThemeProvider></span>
                </div>
                </div>

              </div>
            </div>
          )
        })
      ) : (
          <div>
            <p>there are no unpaid requests</p>
          </div>
        );

      // PUTTING EVERYTHING TOGETHER INTO THE LAYOUT

    return (
      <PageWrapper>
        <Header>Pending Approval</Header>
        <Section>
          {renderUnApprovedRequests}
        </Section>
        <Header>Pending Payment</Header>
        <Section>
          {renderUnpaidRequests}
        </Section>
      </PageWrapper>
    );
  }
}


export default withStyles(styles)(ListingRequestsPage);
