import React, { Component } from 'react';
import Validation from './validation';

/* a form to sign up */
class UserSignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {firstName:"", lastName:"", emailAddress:"", password:"", confirmPassword:"", errors:[]};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    /* function for the values of the text inputs */
    handleChange(event) {
        const change = {};
        change[event.target.name] = event.target.value;
        this.setState(change);
    }

    /* call the sign-up method set in App.js file */
    async handleSubmit(event) {
        event.preventDefault();
        const { firstName, lastName, emailAddress, password, confirmPassword } = this.state;
        const errors = [[firstName, "First Name"], [lastName, "Last Name"], [emailAddress,"Email Address"], [password, "Password"], [confirmPassword, "Confirm Password"]]
            .map(cur => cur[0] === "" ? `Please provide a value for "${cur[1]}"` : null)
            .filter(cur => cur);
        if (password !== confirmPassword) {
            errors.push("Password and Confirm Password doesn't match!");
        }
        if (errors.length) {
            this.setState({ errors });
        } else {
            try {
                const user = { firstName, lastName, emailAddress, password };
                const response = await this.props.signUp(user);
                if (response.length) {
                    this.setState({ errors:response });
                } else {
                    this.props.history.push('/');
                }
            } catch(error) {
                console.error(error);
                this.props.history.push('/error');
            }
        }
    }

    /* cancel and go back to courses list */
    handleCancel(event) {
        event.preventDefault();
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    <Validation errors={this.state.errors} />
                    <div>
                        <form>
                            <div>
                                <input id="firstName" name="firstName" type="text" className="" placeholder="First Name" value={this.state.firstName} onChange={this.handleChange} />
                            </div>
                            <div>
                                <input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" value={this.state.lastName} onChange={this.handleChange} />
                            </div> 
                            <div>                  
                                <input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" value={this.state.emailAddress} onChange={this.handleChange} />
                            </div>
                            <div>
                                <input id="password" name="password" type="password" className="" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                            </div>
                            <div>
                                <input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={this.handleChange} />
                            </div>
                            <div className="grid-100 pad-bottom">
                                <button className="button" type="submit" onClick={this.handleSubmit}>Sign Up</button>
                                <button className="button button-secondary" onClick={this.handleCancel}>Cancel</button>
                            </div>
                        </form>
                    </div>
                    <p>&nbsp;</p>
                    <p>Already have a user account? <a href="/signin">Click here</a> to sign in!</p>
                </div>
            </div>
        );
    }
}

export default UserSignUp;
