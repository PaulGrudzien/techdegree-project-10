import React, { Component } from 'react';
import fetchRequest from '../fetchRequest';

class UpdateCourse extends Component {
    constructor() {
        super();
        this.state = {title:"", description:"", estimatedTime:"", materialsNeeded:"", owner:{}};
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
        this.props.history.push('/');
    }

    handleCancel(event) {
        event.preventDefault();
        this.props.history.push(`/courses/${this.props.match.params.id}`);
    }

    componentDidMount() {
        const courseId = this.props.match.params.id;
        fetchRequest(`/courses/${courseId}`, 'GET')
            .then(course => this.setState({...course}))
            .then(() => {
                if (this.state.owner.id !== this.props.user.id) {
                    this.props.history.push('/forbidden');
                }
            })
            .catch(error => console.error('Error fetching and parsing data', error));
    }

    render() {
        return (
            <div className="bounds course--detail">
                <h1>Update Course</h1>
                <div>
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
                            <button className="button" type="submit"  onSubmit={this.handleSubmit}>Update Course</button>
                            <button className="button button-secondary" onClick={this.handleCancel}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default UpdateCourse;
