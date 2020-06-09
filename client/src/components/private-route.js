import React from 'react';
import { Route, Redirect } from 'react-router-dom';

/* verify a user is sign-in and redirect to the asked page or to the sign-in page */
function PrivateRoute(props) {
    const {component:Component , credentials, ...rest} = props;
    return (
        <Route {...rest} render={routerProps => credentials ? <Component credentials={credentials} {...routerProps} {...rest} /> : <Redirect to="/signin" />} />
    );
};

export default PrivateRoute
