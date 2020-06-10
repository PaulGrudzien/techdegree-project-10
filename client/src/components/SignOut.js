import React from 'react';
import { Redirect } from 'react-router';

/* redirect to the courses list */
function SignOut(props) {
    props.signOut()
    return(
        <Redirect to="/" />
    );
}

export default SignOut;
