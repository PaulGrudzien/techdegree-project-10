import React, { Component } from 'react';
import { Redirect } from 'react-router';

/* log-out an user and redirect to the courses list */
class UserSignOut extends Component {
    componentWillUnmount() {
        this.props.signOut();
    }
    
    render() {
        return (
            <Redirect to="/" />
        );
    }
}

export default UserSignOut;
