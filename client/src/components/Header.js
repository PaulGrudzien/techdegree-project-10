import React from 'react';

/* an header with the authorization informations or links */
function Header(props) {
    return (
        <div className="header">
            <div className="bounds">
                <a href="/"><h1 className="header--logo">Courses</h1></a>
                <nav>
                {props.user
                    ? <><span>{`Welcome ${props.user.firstName} ${props.user.lastName}`}!</span><a className="signout" href="/signout">Sign Out</a></>
                    : <><a className="signup" href="/signup">Sign Up</a><a className="signin" href="/signin">Sign In</a></>
                }
                </nav>
            </div>
        </div>
    );
}

export default Header;
