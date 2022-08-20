import React, { Component } from 'react';
import { test } from "../../services";
import { connect } from 'react-redux';
import { onLogin } from '../../redux/actions/login';

class HomePage extends Component {
    render() {
        console.log("render HomePage");
        return (
            <div>
                <p onClick={() => test()}>Home Page</p>
                <button onClick={async () => this.props.onLogin()}
                    type="button" className="btn btn-primary"> CLick me to Logout</button>
                <br />
                <br />
                <button onClick={async () => { this.props.history.push('topics') }}
                    type="button" className="btn btn-primary"> CLick me to Topics</button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        inforLogin: state.LoginReducer.inforLogin
    }
}

export default connect(mapStateToProps, { onLogin })(HomePage);