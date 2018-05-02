import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { baseLink } from '../link';
import Request from './Request'
import { withStyles, MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import yellow from 'material-ui/colors/yellow';

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
  button: {
    margin: theme.spacing.unit,
  }
});

const theme = createMuiTheme({
  palette: {
    primary: yellow
  },
});

class HistoryTab extends Component {

  state = {
    paid_requests: [],
    history: []
  };

  getHistory = () => {
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
        paid_requests: data.requests.filter(req => req['paid'] === true && req['approved'] === true)
      });
    });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.getHistory();
  };

  render() {
    const { classes } = this.props;
    const { paid_requests } = this.state;

    // const renderPaidRequests
    const renderPaidRequests = paid_requests ? (
      paid_requests.map((request, index) => {
        return (
          <Request
            createdAt={request.created_at}
            requestId={request.id}
            totalPrice={request.total_price}
            quantity={request.quantity}
            albumPic={request.album_pic}
          >
            <div style={{ marginLeft: 7 }}>
              <span style={{ marginRight: 7 }}><MuiThemeProvider theme={theme}>
                <Button size="small" variant="raised" color="primary" className={classes.button}>
                  Buy Again
              </Button>
              </MuiThemeProvider></span>
            </div>
          </Request>
        )
      })
    ) : (
      <div>
        <p>there are no unapproved requests</p>
      </div>
    );

    return (
       <PageWrapper>
         <Header>Your Payment History</Header>
         <Section>
           {renderPaidRequests}
         </Section>
       </PageWrapper>
    );
  }
}

HistoryTab.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HistoryTab);
