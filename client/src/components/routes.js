import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// import components
import Courses from './courses.js';
import CourseDetail from './course-detail.js';
//import NotFound from './components/not-found.js';

function Router() {
    return(
        <BrowserRouter>
            <Switch>
                {/* route for search */}
                <Route exact path="/" component={Courses}/>
                {/* routes for main topics */}
                <Route exact path="/courses/:id" component={CourseDetail}/>
                {/* // other routes*/}
                {/*<Route component={NotFound} />*/}
            </Switch>
        </BrowserRouter>
    );
}

export default Router;
