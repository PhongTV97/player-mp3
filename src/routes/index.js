import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom";
import LoginPage from "../views/login";
import HomePage from "../views/home";
import TopicsPage from "../views/topics";
import PrivateRoute from "./privateRoute";

class Routers extends Component {
    render() {
        return (
            <Router>
                <Route path="/" exact component={LoginPage} />
                <Route path="/login" component={LoginPage} />
                <PrivateRoute path="/home" component={HomePage} />
                <PrivateRoute path="/topics" component={TopicsPage} />
            </Router>
        );
    }
}

export default Routers;