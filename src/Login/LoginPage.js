import React, { Component } from 'react';
import styled from 'styled-components';
import { FormControl, FormHelperText } from "material-ui/Form";
import Input, { InputAdornment, InputLabel } from "material-ui/Input";
import IconButton from "material-ui/IconButton";
import Button from "material-ui/Button";
import Visibility from "material-ui-icons/Visibility";
import { LinearProgress } from "material-ui/Progress";
import VisibilityOff from "material-ui-icons/VisibilityOff";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import { withStyles } from 'material-ui/styles';
import grey from 'material-ui/colors/grey';

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

const LoginPageWrapper = styled.main`
  font-family: 'Alegreya Sans SC', sans-serif;
  color: white;
  position: relative;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoginFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 35%;
`;

class LoginPage extends Component {
  state = {
    email: "",
    emailError: false,
    emailEmpty: false,
    password: "",
    passwordError: false,
    passwordEmpty: false,
    loading: false,
    submitSuccess: false,
    showPassword: false
  }

  handleChange = props => event => {
    this.setState({ [props]: event.target.value });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ loading: true });
    let emailInputLength = this.state.email.length;
    console.log(emailInputLength);
    let passwordInputLength = this.state.password.length;
    if (emailInputLength === 0) {
      this.setState({
        emailEmpty: !this.state.emailEmpty
      });
    }
    if (passwordInputLength === 0) {
      this.setState({
        passwordEmpty: !this.state.passwordEmpty,
        loading: false
      });
    } else {
      // axios
      //   .post("http://e61054d0.ngrok.io/auth/sign_in", {
      //     email: this.state.email,
      //     password: this.state.password
      //   })
      //   .then(res => {
      //     console.log(res.data);
      //     if (res.data.token) {
      //       // if authentication successful, set jwt and redirect to home page
      //       localStorage.setItem("jwtToken", res.data.token);
      //       localStorage.setItem("user", res.data.firstName);
      //       // this.props.userHasAuthenticated(true);
      //       // this.props.getUser(res.data.firstname);
      //       this.props.history.push("/");
      //     } else {
      //       this.setState({
      //         loading: false
      //       });
      //       if (res.data.error === "email") {
      //         this.setState({ emailError: !this.state.emailError });
      //       } else {
      //         if (this.state.emailError) {
      //           this.setState({ emailError: !this.state.emailError });
      //         }
      //         this.setState({ passwordError: !this.state.passwordError });
      //       }
      //     }
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
      // axios({
      //   method: 'post',
      //   url: 'http://e61054d0.ngrok.io/auth/sign_in',
      //   headers: {
      //     'access-token': {accessToken},
      //     'client': {client},
      //     'expiry': {expiry},
      //     'token-type': {tokenType},
      //     'uid': {uid}
      //   }
      // });
    }
  };

  render() {
    const { emailError, passwordError } = this.state;
    const { classes } = this.props;
    // conditional rendering of email and password input field depending on status of input
    const emailInputField = emailError ? (
      <FormControl error>
        <InputLabel htmlFor="email-input"
          FormLabelClasses={{
            root: classes.cssLabel,
            focuses: classes.cssFocused
          }}
        >Email</InputLabel>
        <Input
          id="email-input"
          value={this.state.email}
          style={{ width: '75vw' }}
          onChange={this.handleChange("email")}
        />
        <FormHelperText>Email does not exist</FormHelperText>
      </FormControl>
    ) : (
        <FormControl>
          <InputLabel htmlFor="email-input">Email</InputLabel>
          <Input
            id="email-input"
            value={this.state.email}
            style={{ width: '75vw' }}
            onChange={this.handleChange("email")}
          />
        </FormControl>
      );

    const passwordInputField = passwordError ? (
      <FormControl error>
        <InputLabel htmlFor="adornment-password">Password</InputLabel>
        <Input
          id="adornment-password"
          type={this.state.showPassword ? "type" : "password"}
          value={this.state.password}
          style={{ width: '75vw' }}
          onChange={this.handleChange("password")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="Toggle Password visibility"
                onClick={this.handleClickShowPassword}
                onMouseDown={this.handleMouseDownPassword}
              >
                {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        <FormHelperText>Incorrect Password</FormHelperText>
      </FormControl>
    ) : (
        <FormControl>
          <InputLabel htmlFor="adornment-password">Password</InputLabel>
          <Input
            id="adornment-password"
            type={this.state.showPassword ? "type" : "password"}
            value={this.state.password}
            style={{ width: '75vw' }}
            onChange={this.handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle Password visibility"
                  onClick={this.handleClickShowPassword}
                  onMouseDown={this.handleMouseDownPassword}
                >
                  {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      );

    return (
      <LoginPageWrapper>
        <LoginFormWrapper autoComplete="off" onSubmit={this.handleSubmit}>
          {emailInputField}
          {passwordInputField}
          <Button
            variant="raised"
            style={{
              backgroundColor: "#62CA99",
              color: "#FFFFFF",
              fontSize: "0.9rem",
              marginTop: 22
            }}
            type="submit"
            value="submit"
          >
            Login
          </Button>
          <div
            style={{
              flexGrow: 1,
              bottom: 0,
              position: "absolute",
              width: "75vw",
              fontFamily: "'Alegreya Sans SC', sans-serif"
            }}
          >
            {this.state.loading && <LinearProgress value={0} />}
          </div>
          <Link to='/register' style={{ marginTop: 20, textDecoration: 'none', color: 'black' }}>Not yet a member? Join us here!</Link>
        </LoginFormWrapper>
      </LoginPageWrapper>
          )
        }
      }

export default withStyles(styles)(LoginPage);
