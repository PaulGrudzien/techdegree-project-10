import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute(props) {
    const {component:Component , credentials, ...rest} = props;
    return (
        <Route {...rest} render={routerProps => credentials ? <Component {...routerProps} {...rest} /> : <Redirect to="/signin" />} />
    );
};

export default PrivateRoute
