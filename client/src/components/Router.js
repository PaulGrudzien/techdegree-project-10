import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// import components
import CoursesList from './CoursesList.js';
import CourseDetail from './CourseDetail.js';
import CreateCourse from './CreateCourse.js';
import UpdateCourse from './UpdateCourse.js';
import SignIn from './SignIn.js';
import SignUp from './SignUp.js';
import SignOut from './SignOut.js';
import NotFound from './NotFound.js';
import Forbidden from './Forbidden.js';
import UnhandledError from './UnhandledError.js';
import PrivateRoute from './PrivateRoute';

/* all the routes used in the apps */
function Router(props) {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={CoursesList}/>
                <PrivateRoute exact path="/courses/create" component={CreateCourse} credentials={props.credentials} user={props.user}/>
                <PrivateRoute exact path="/courses/:id/update" component={UpdateCourse} credentials={props.credentials} user={props.user}/>
                <Route exact path="/courses/:id" render={(routerProps) => <CourseDetail {...routerProps} user={props.user} credentials={props.credentials} />} />
                <Route path="/signin" render={(routerProps) => <SignIn {...routerProps} signIn={props.signIn} />} />
                <Route path="/signup" render={(routerProps) => <SignUp {...routerProps} signUp={props.signUp} />} />
                <Route path="/signout" render={(routerProps) => <SignOut {...routerProps} signOut={props.signOut} user={props.user} />} />
                <Route exact path="/notfound" component={NotFound}/>
                <Route exact path="/error" component={UnhandledError}/>
                <Route exact path="/forbidden" component={Forbidden}/>
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
}

export default Router;
