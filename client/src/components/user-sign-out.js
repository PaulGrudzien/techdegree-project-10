import React, { Component } from 'react';
import { Redirect } from 'react-router';

class UserSignOut extends Component {
    componentWillUnmount() {
        this.props.signOut()
    }
    
    render() {
        return (
            <Redirect to="/" />
        );
    }
}

export default UserSignOut;
