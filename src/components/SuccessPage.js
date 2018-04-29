import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

const SuccessPageWrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  height: 100vh;
`;

class SuccessPage extends Component {
  constructor() {
    super();
    this.state = {
      timer: 5
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.decreaseTimer(), 1000);
    // redirect to home page after 5s
    setTimeout(() => {
      this.props.history.push('/');
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  decreaseTimer = () => {
    this.setState(prevState => ({
      timer: prevState.timer - 1
    }));
  };

  render() {
    const { type } = this.props;
    return (
      <SuccessPageWrapper>
        {type === 'register' && <h4>Thank you for signing up!</h4>}
        {type === 'login' && <h4>Successfully logged in!</h4>}
        {type === 'logout' && <h4>You have logged out.</h4>}
        <h6>You will be redirected to the home page in {this.state.timer}s...</h6>
      </SuccessPageWrapper>
    );
  }
}

export default withRouter(SuccessPage);