import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

class PrivateRoute extends Component {
    checkLogin() {
        const isLogin = JSON.parse(localStorage.getItem("isLogin"));
        return isLogin;
    }
    render() {
        return this.checkLogin() ? (<Route exact path={this.props.path} component={this.props.component} />) :
            (<Redirect to="/login" />);
    }
};
export default PrivateRoute;