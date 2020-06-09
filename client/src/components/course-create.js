import React, { Component } from 'react';

class CreateCourse extends Component {
    constructor() {
        super();
        this.state = {title:"", description:"", estimatedTime:"", materialsNeeded:""};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleChange(event) {
        const change = {};
        change[event.target.name] = event.target.value;
        this.setState(change);
    }

    handleSubmit(event) {
        event.preventDefault();
        // add here the validation of the form
        // add here the authentification
        this.props.history.push('/');
    }

    handleCancel(event) {
        event.preventDefault();
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="bounds course--detail">
                <h1>Create Course</h1>
                <div>
                    <div>
                        <h2 className="validation--errors--label">Validation errors</h2>
                        <div className="validation-errors">
                            <ul>
                                <li>Please provide a value for "Title"</li>
                                <li>Please provide a value for "Description"</li>
                            </ul>
                        </div>
                    </div>
                    <form>
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <div>
                                    <input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." value={this.state.title} onChange={this.handleChange} />
                                </div>
                                <p>By Joe Smith</p>
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
                            <button className="button" type="submit" onSubmit={this.handleSubmit}>Create Course</button>
                            <button className="button button-secondary" onClick={this.handleCancel}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default CreateCourse;
