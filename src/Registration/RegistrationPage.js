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
import { withRouter } from "react-router-dom";
import { withStyles } from 'material-ui/styles';
import grey from 'material-ui/colors/grey';
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

const RegistrationPageWrapper = styled.main`
  font-family: 'Alegreya Sans SC', sans-serif;
  color: white;
  position: relative;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const RegistrationFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 35%;
`;

class RegistrationPage extends Component {
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
      axios
        .post(baseLink + '/auth', {
          email: this.state.email,
          password: this.state.password
        })
        .then(res => {
          console.log(res);
          if (res.headers) {
            // if registration successful, set required headers content to localstorage
            // content will be sent together with get request for user specific data
            localStorage.setItem("access-token", res.headers["access-token"]);
            localStorage.setItem("client", res.headers.client);
            localStorage.setItem("expiry", res.headers.expiry);
            localStorage.setItem("token-type", res.headers["token-type"]);
            localStorage.setItem("uid", res.headers.uid);
            this.props.handleLogin();
            this.props.history.push("/register/success");
          } else {
            this.setState({
              loading: false
            });
            if (res.data.error === "email") {
              this.setState({ emailError: !this.state.emailError });
            } else {
              if (this.state.emailError) {
                this.setState({ emailError: !this.state.emailError });
              }
              this.setState({ passwordError: !this.state.passwordError });
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
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
      <RegistrationPageWrapper>
        <RegistrationFormWrapper autoComplete="off" onSubmit={this.handleSubmit}>
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
            Sign Up
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
        </RegistrationFormWrapper>
      </RegistrationPageWrapper>
          )
        }
      }

export default withStyles(styles)(withRouter(RegistrationPage));

