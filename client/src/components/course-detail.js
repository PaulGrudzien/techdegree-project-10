import React, { Component } from 'react';
import fetchRequest from '../fetchRequest';

class CourseDetail extends Component {
    constructor() {
        super();
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
        // prepare items for Materials Needed
        const stringMaterialsNeeded = this.state.course.materialsNeeded;
        let liMaterialsNeeded = 'none';
        if (stringMaterialsNeeded !== null) {
            liMaterialsNeeded = stringMaterialsNeeded.split("\n* ").map((item, index) => {
                 return <li key={index}>{item.replace('* ', '')}</li>
            })
        }
        // prepare paragraphs for Description
        const stringDescription = this.state.course.description;
        let pDescription;
        if (stringDescription) {
            pDescription = stringDescription.split("\n").map((item, index) => {
                 return <p key={index}>{item}</p>
            })
        }
        // render Course Details
        return (
            <div>
                <div className="actions--bar">
                    <div className="bounds">
                        <div className="grid-100">
                            <span>
                                <a className="button" href="update-course.html">Update Course</a>
                                <a className="button" href="/">Delete Course</a>
                            </span>
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
                            {pDescription}
                        </div>
                    </div>
                        <div className="grid-25 grid-right">
                            <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <h3>{this.state.course.estimatedTime ? this.state.course.estimatedTime : "unknow"}</h3>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <ul>
                                        {liMaterialsNeeded}
                                    </ul>
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
