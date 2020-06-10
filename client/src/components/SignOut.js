import React, { useEffect } from 'react';
import { Redirect } from 'react-router';

/* redirect to the courses list */
function SignOut(props) {
    /* this call of useEffect is comparable as calling props.signOut in a componentWillUnmount */
    useEffect(() => {return () => {props.signOut()}})
    return(
        <Redirect to="/" />
    );
}

export default SignOut;
