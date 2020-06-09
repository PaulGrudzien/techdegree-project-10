import React, { Component } from 'react';
import CourseItem from './course-item';
import NewCourseButton from './course-new-button';
import fetchRequest from '../fetchRequest';

class CoursesList extends Component {
    constructor() {
        super();
        this.state = {courses:[]}
    }

    componentDidMount() {
        fetchRequest('/courses', 'GET')
            .then(courses => this.setState({courses}))
            .catch(error => console.error('Error fetching and parsing data', error));
    }

    render() {
        return (
            <div className="bounds">
                {this.state.courses.map(course =>
                    <CourseItem key={course.id} id={course.id} title={course.title} />
                )}
                <NewCourseButton />
            </div>
        );
    }
}

export default CoursesList;
