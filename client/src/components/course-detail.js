import React, { Component } from 'react';
import fetchRequest from '../fetchRequest';
import ReactMarkdown from 'react-markdown';
import deleteCourse from './course-delete.js';

class CourseDetail extends Component {
    constructor(props) {
        super(props);
        this.state = { course:{ 
            owner:{},
            materialsNeeded:null
        }}
    }

    componentDidMount() {
        const courseId = this.props.match.params.id
        fetchRequest(`/courses/${courseId}`, 'GET')
            .then(course => this.setState({course}))
            .catch(error => console.error('Error fetching and parsing data', error));
    }

    render() {
        return (
            <div>
                <div className="actions--bar">
                    <div className="bounds">
                        <div className="grid-100">
                            {this.props.user && (this.props.user.id === this.state.course.owner.id) && (
                                <span>
                                    <a className="button" href={`/courses/${this.props.match.params.id}/update`}>Update Course</a>
                                    <button className="button" onClick={() => deleteCourse(this.state.course, this.props)}>Delete Course</button>
                                </span>
                            )}
                            <a className="button button-secondary" href="/">Return to List</a>
                        </div>
                    </div>
                </div>
                <div className="bounds course--detail">
                    <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{this.state.course.title}</h3>
                            <p>{`${this.state.course.owner.firstName} ${this.state.course.owner.lastName}`}</p>
                        </div>
                        <div className="course--description">
                            <ReactMarkdown source={this.state.course.description} />
                        </div>
                    </div>
                        <div className="grid-25 grid-right">
                            <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <h3>{this.state.course.estimatedTime}</h3>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <ReactMarkdown source={this.state.course.materialsNeeded} />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CourseDetail;
