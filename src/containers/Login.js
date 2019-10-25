import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
//import cookies from 'react-cookies'
import "./Login.css";
import axios from 'axios';
import {setAuthToken, setUserName} from "../Session";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      grant_type:"password",
      userResponse: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    
    // const body = {
    //   userName: this.state.username,
    //   password: this.state.password,
    // };
    // console.log(body);
    axios({
      method: 'post',
      url: 'http://http://zuulserver-s2-travelsystem.apps.na311.openshift.opentlc.com:8762/oauth/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic '+btoa("client:secret")
      },
      params: {
        username: this.state.username,
        password: this.state.password,
        grant_type:this.state.grant_type
      }
    }).then(response => response.data)
      .then((data) => {
       // if (data.msg === 'active') {
         // setUserProfile(data);
        //  console.log(window.sessionStorage.getItem("userProfile"));
         // this.props.userHasAuthenticated(true);
         // this.props.history.push("/home");
      //  } else {
       //   console.log('inactive');
       // }setAuthToken
       setAuthToken(data.access_token);
       setUserName(this.state.username);
       this.props.userHasAuthenticated(true);
       console.log(window.sessionStorage.getItem("username"));
       this.props.history.push("/home");
       //cookies.set('username', 'this.state.username', { path: '/' });
     // cookie.save("userId",userId, expireDate);
    //  cookies.save("access_token", data.access_token,  { path: '/' });
      });
    console.log(this.state.userResponse);
    //  axios('http://localhost:8080/tms/login',body)
    //   .then(response => console.log(response))
    
  }

  // saveToken(token, userId){
  //   var expireDate = new Date().getTime() + (1000 * token.expires_in);
  //   cookie.set("userId",userId, expireDate);
  //   cookie.set("access_token", token.access_token, expireDate);
  //   console.log('Obtained Access token');
  //   this.props.history.push("/home");
  // }

  render() {
   
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="username" bsSize="large">
            <ControlLabel>username</ControlLabel>
            <FormControl
              autoFocus
              type="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}
