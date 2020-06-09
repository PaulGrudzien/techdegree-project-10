import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// import components
import CoursesList from './courses-list.js';
import CourseDetail from './course-detail.js';
import CreateCourse from './course-create.js';
import UpdateCourse from './course-update.js';
import SignIn from './user-sign-in.js';
import SignUp from './user-sign-up.js';
import SignOut from './user-sign-out.js';
import NotFound from './not-found.js';
import Forbidden from './forbidden.js';
import UnhandledError from './error.js';
import PrivateRoute from './private-route';

function Router(props) {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={CoursesList}/>
                <PrivateRoute exact path="/courses/create" component={CreateCourse} credentials={props.credentials}/>
                <PrivateRoute exact path="/courses/:id/update" component={UpdateCourse} credentials={props.credentials} user={props.user}/>
                <Route exact path="/courses/:id" render={(routerProps) => <CourseDetail {...routerProps} user={props.user} credentials={props.credentials} />} />
                <Route path="/signin" render={(routerProps) => <SignIn {...routerProps} signIn={props.signIn} />} />
                <Route path="/signup" render={(routerProps) => <SignUp {...routerProps} />} />
                <Route path="/signout" render={(routerProps) => <SignOut {...routerProps} signOut={() => props.signOut()} />} />
                <Route exact path="/notfound" component={NotFound}/>
                <Route exact path="/error" component={UnhandledError}/>
                <Route exact path="/forbidden" component={Forbidden}/>
                <Route exact path="/courses/:id" component={CourseDetail}/>
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
}

export default Router;
