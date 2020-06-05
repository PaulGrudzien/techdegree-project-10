import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// import components
import Courses from './courses.js';
import CourseDetail from './course-detail.js';
import SignIn from './user-sign-in.js';
import SignUp from './user-sign-up.js';
//import NotFound from './components/not-found.js';

function Router(props) {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Courses}/>
                <Route exact path="/courses/:id" component={CourseDetail}/>
                <Route path="/sign-in" component={SignIn}/>
                <Route path="/sign-up" render={(props) => <SignUp {...props} />} />
                {/*<Route component={NotFound} />*/}
            </Switch>
        </BrowserRouter>
    );
}

export default Router;
