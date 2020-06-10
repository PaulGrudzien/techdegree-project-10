import React, { Component } from 'react';
import { Redirect } from 'react-router';

/* log-out an user and redirect to the courses list */
class SignOut extends Component {
    componentWillUnmount() {
        this.props.signOut();
    }
    
    render() {
        return (
            <Redirect to="/" />
        );
    }
}

export default SignOut;
