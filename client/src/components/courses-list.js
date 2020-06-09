import React, { Component } from 'react';
import CourseItem from './course-item';
import NewCourseButton from './course-new-button';
import fetchRequest from '../fetchRequest';

/* the list of all courses */
class CoursesList extends Component {
    constructor(props) {
        super(props);
        this.state = {courses:[]};
    }

    /* load the details of the course */
    async componentDidMount() {
        try {
            const response = await fetchRequest('/courses', 'GET');
            const courses = await response.json();
            this.setState({courses});
        } catch(error) {
            console.error(error);
            this.props.history.push('/error');
        }
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
