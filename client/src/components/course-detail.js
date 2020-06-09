import React, { Component } from 'react';
import fetchRequest from '../fetchRequest';
import ReactMarkdown from 'react-markdown';
import deleteCourse from './course-delete.js';

/* a detailled view of a course */
class CourseDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {id:"", title:"", description:"", estimatedTime:"", materialsNeeded:"", owner:{}};
    }

    /* load the details of the course */
    async componentDidMount() {
        try {
            const courseId = this.props.match.params.id;
            const response = await fetchRequest(`/courses/${courseId}`, 'GET');
            if (response.status === 200 || response.status === 304) {
                const course = await response.json();
                this.setState({...course});
            } else if (response.status === 404) {
                this.props.history.push('/notfound');
            } else {
                throw new Error("Internal Server Error");
            }
        } catch(error) {
            console.error(error);
            this.props.history.push('/error');
        }
    }

    render() {
        return (
            <div>
                <div className="actions--bar">
                    <div className="bounds">
                        <div className="grid-100">
                            {this.props.user && (this.props.user.id === this.state.owner.id) && (
                                <span>
                                    <a className="button" href={`/courses/${this.props.match.params.id}/update`}>Update Course</a>
                                    <button className="button" onClick={() => deleteCourse(this.state.id, this.props)}>Delete Course</button>
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
                            <h3 className="course--title">{this.state.title}</h3>
                            <p>{`By ${this.state.owner.firstName} ${this.state.owner.lastName}`}</p>
                        </div>
                        <div className="course--description">
                            <ReactMarkdown source={this.state.description} />
                        </div>
                    </div>
                        <div className="grid-25 grid-right">
                            <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <h3>{this.state.estimatedTime}</h3>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <ReactMarkdown source={this.state.materialsNeeded} />
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
