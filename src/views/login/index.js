import React, { Component } from 'react';
import { connect } from 'react-redux';
import { onLogin } from '../../redux/actions/login';

class LoginPage extends Component {
    render() {
        console.log("render Login", this.props);
        return (
            <div>
                <p>Login Page</p>
                <button onClick={() => this.props.history.push('home')}
                    type="button" className="btn btn-primary"> CLick me to Login</button>
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        inforLogin: state.LoginReducer.inforLogin
    }
}

export default connect(mapStateToProps, { onLogin })(LoginPage);