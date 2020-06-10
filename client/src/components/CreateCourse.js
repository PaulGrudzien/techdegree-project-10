import React, { Component } from 'react';
import Validation from './Validation';
import fetchRequest from '../fetchRequest';

/* a form to create a course */
class CreateCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {title:"", description:"", estimatedTime:"", materialsNeeded:"", errors:[]};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    };

    /* function for the values of the text inputs */
    handleChange(event) {
        const change = {};
        change[event.target.name] = event.target.value;
        this.setState(change);
    };

    /* create the course */
    async handleSubmit(event) {
        event.preventDefault();
        const { title, description, estimatedTime, materialsNeeded } = this.state;
        try {
            const course = { title, description, estimatedTime, materialsNeeded };
            const response = await fetchRequest(`/courses`, 'POST', course, true, this.props.credentials);
            if (response.status === 201) {
                this.props.history.push('/');
            } else if (response.status === 400) {
                const error = await response.json();
                this.setState({ errors:error.errors });
            } else {
                throw new Error();
            };
        } catch(error) {
            console.error(error);
            this.props.history.push('/error');
        };
    };

    /* cancel and go back to courses list */
    handleCancel(event) {
        event.preventDefault();
        this.props.history.push('/');
    };

    render() {
        return (
            <div className="bounds course--detail">
                <h1>Create Course</h1>
                <div>
                    <Validation errors={this.state.errors} />
                    <form onSubmit={this.handleSubmit}>
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <div>
                                    <input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." value={this.state.title} onChange={this.handleChange} />
                                </div>
                                <p>{`By ${this.props.user.firstName} ${this.props.user.lastName}`}</p>
                            </div>
                            <div className="course--description">
                                <div>
                                    <textarea id="description" name="description" className="" placeholder="Course description..." value={this.state.description} onChange={this.handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className="grid-25 grid-right">
                            <div className="course--stats">
                                <ul className="course--stats--list">
                                    <li className="course--stats--list--item">
                                        <h4>Estimated Time</h4>
                                        <div>
                                            <input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" value={this.state.estimatedTime} onChange={this.handleChange} />
                                        </div>
                                    </li>
                                    <li className="course--stats--list--item">
                                        <h4>Materials Needed</h4>
                                        <div>
                                            <textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." value={this.state.materialsNeeded} onChange={this.handleChange} />
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="grid-100 pad-bottom">
                            <button className="button" type="submit">Create Course</button>
                            <button className="button button-secondary" onClick={this.handleCancel}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };
};

export default CreateCourse;
