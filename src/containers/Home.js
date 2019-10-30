import React, { Component } from "react";
import "./Home.css";
import { getAuthToken, getUserName } from "../Session";
import axios from 'axios';
import TripSummary from './TripSummary';
import {  Navbar } from "react-bootstrap";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: getUserName(),
            authtoken: getAuthToken(),
            trips: []
        };
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: 'http://zuulserver-s2-travelsystem.apps.na311.openshift.opentlc.com/trip-summary/trip',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.state.authtoken
            }
        }).then(response => response.data)
            .then((data) => {
                this.setState({ trips: data })
                console.log('cehek', data)
            });
    }



    render() {

        return (
            <div>
                <div className="wlc">
                    <Navbar.Header>
                        Welcome {this.state.username}
                    </Navbar.Header>
                </div>
                <TripSummary trips={this.state.trips} />

            </div>
        );
    }
}
