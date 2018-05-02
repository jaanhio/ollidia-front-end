import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import DeleteIcon from 'material-ui-icons/Delete';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import { baseLink } from '../link';
import { withStyles, MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import green from 'material-ui/colors/green';
import yellow from 'material-ui/colors/yellow';
import purple from 'material-ui/colors/purple';
import Checkout from '../Requests/Checkout';

const PageWrapper = styled.main`
  position: relative;
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

const styles = theme => ({
  nomineeAvatar: {
    width: 80,
    height: 80,
  },
  paper: {
    position: 'absolute',
    width: '70vw',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  button: {
    margin: theme.spacing.unit,
  }
});

const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: yellow,
    tertiary: purple
  },
});

class OrdersTab extends Component {

  state = {
    listings: []
  };

  getOrders = () => {
    axios({
      method: 'get',
      url: `${baseLink()}/api/v1/myrequests`,
      headers: {
        'access-token': localStorage.getItem('access-token'),
        'client': localStorage.getItem('client'),
        'expiry': localStorage.getItem('expiry'),
        'token-type': localStorage.getItem('token-type'),
        'uid': localStorage.getItem('uid')
      }
    }).then(res => {
      const { data } = res; // json file
      console.log(data);

      this.setState({
        approved_requests: data.requests.filter(req => req['paid'] === false && req['approved'] === true),
        unapproved_requests: data.requests.filter(req => req['paid'] === false && req['approved'] === false)
      });
    });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.getOrders();
  };

  render() {
    const { classes } = this.props;
    const { approved_requests, unapproved_requests } = this.state;

    // const renderApprovedRequests
    const renderApprovedRequests = approved_requests ? (
      approved_requests.map((request, index) => {
        return (

          <div style={{ margin: '20px 20px', backgroundColor: 'white' }}>
            <div style={{ height: '45px', textAlign: 'left', padding: '10px 10px 0px 10px', backgroundColor: '#CFD8DC' }}>
              <span style={{ marginBottom: 5 }}>Request Placed: {request.created_at}</span>
              <span style={{ float: 'right' }}>ID: #{request.id}</span>
              <br></br>
              <span style={{ fontWeight: 400, paddingTop: 10 }}>Total Charge: ${request.total_price}, Quantity: {request.quantity}</span>
            </div>
            <div style={{ height: '105px', textAlign: 'left', verticalAlign: 'bottom', padding: 10, fontWeight: 200 }}>
              <div style={{ height: '100px', display: 'inline-block' }}><img style={{ maxHeight: '100%', maxWidth: '100%' }} src={request.album_pic} /></div>

              <div style={{ verticalAlign: 'top', display: 'inline-block' }}>
                <div style={{ verticalAlign: 'top' }}>
                  <span style={{ marginLeft: 7, fontWeight: 400 }}>Album: Name</span>
                  <br></br>
                  <span style={{ marginLeft: 7 }}>Price: $123</span>
                  <br></br>
                  <span style={{ marginLeft: 7 }}>Sold By: Seller 123</span>
                </div>
                <div style={{ marginLeft: 7 }}>
                  <span style={{ padding: 0, marginRight: 7 }}><MuiThemeProvider theme={theme}>
                    <Checkout
                      name={'Pay Now'}
                      description={'Kpop'}
                      amount={request.total_price}
                      request_id={request.id}
                    />
                  </MuiThemeProvider></span>
                  <span><IconButton style={{ padding: 0, marginLeft: -8, marginRight: -8 }} aria-label="delete" className={classes.button}>
                    <DeleteIcon size="small" />
                  </IconButton></span>
                </div>
              </div>

            </div>
          </div>
        )
      })
    ) : (
        <div>
          <p>there are no approved requests</p>
        </div>
      );

    // const renderUnApprovedRequests
    const renderUnApprovedRequests = unapproved_requests ? (
      unapproved_requests.map((request, index) => {
        return (

          <div style={{ margin: '20px 20px', backgroundColor: 'white' }}>
            <div style={{ height: '45px', textAlign: 'left', padding: '10px 10px 0px 10px', backgroundColor: '#CFD8DC' }}>
              <span style={{ marginBottom: 5 }}>Request Placed: {request.created_at}</span>
              <span style={{ float: 'right' }}>ID: #{request.id}</span>
              <br></br>
              <span style={{ fontWeight: 400, paddingTop: 10 }}>Total Charge: ${request.total_price}, Quantity: {request.quantity}</span>
            </div>
            <div style={{ height: '105px', textAlign: 'left', verticalAlign: 'bottom', padding: 10, fontWeight: 200 }}>
              <div style={{ height: '100px', display: 'inline-block' }}><img style={{ maxHeight: '100%', maxWidth: '100%' }} src={request.album_pic} /></div>

              <div style={{ verticalAlign: 'top', display: 'inline-block' }}>
                <div style={{ verticalAlign: 'top' }}>
                  <span style={{ marginLeft: 7, fontWeight: 400 }}>Album: Name</span>
                  <br></br>
                  <span style={{ marginLeft: 7 }}>Price: $123</span>
                  <br></br>
                  <span style={{ marginLeft: 7 }}>Sold By: Seller 123</span>
                </div>
                <div style={{ marginLeft: 7 }}>
                  <span style={{ marginRight: 7 }}><MuiThemeProvider theme={theme}>
                    <Button size="small" variant="raised" color="secondary" className={classes.margin}>
                      Edit
                </Button>
                  </MuiThemeProvider></span>
                  <span><IconButton style={{ padding: 0, marginLeft: -5, marginRight: -5 }} aria-label="delete" className={classes.button}>
                    <DeleteIcon size="small" />
                  </IconButton></span>
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

    return (
      <PageWrapper>
        <Header>Approved</Header>
        <Section>
          {renderApprovedRequests}
        </Section>
        <Header>Unapproved</Header>
        <Section>
          {renderUnApprovedRequests}
        </Section>
      </PageWrapper>
    );
  }
}

OrdersTab.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OrdersTab);
