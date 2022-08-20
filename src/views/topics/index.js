import React, { Component } from 'react';
import { connect } from 'react-redux';


class TopicsPage extends Component {
    render() {
        console.log("render TopicsPage");
        return (
            <div>
                <p>Topics Page</p>
                <button onClick={async () => { localStorage.clear(); this.props.history.push('home') }}
                    type="button" className="btn btn-primary"> CLick me to Home</button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        inforLogin: state.LoginReducer.inforLogin
    }
}

export default connect(mapStateToProps, null)(TopicsPage)