import React, { Component } from 'react';
import Validation from './validation';

/* a form to sign in */
class UserSignIn extends Component {
    constructor() {
        super();
        this.state = {emailAddress:"", password:"", errors:[]};
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

    /* call the sign-in method set in App.js file */
    async handleSubmit(event) {
        event.preventDefault();
        const { emailAddress, password } = this.state;
        const errors = [[emailAddress,"Email Address"], [password, "Password"]]
            .map(cur => cur[0] === "" ? `Please provide a value for "${cur[1]}"` : null)
            .filter(cur => cur);
        if (errors.length) {
            this.setState({ errors });
        } else {
            try {
                const response = await this.props.signIn(emailAddress, password);
                if (response === "Ok") {
                    this.props.history.goBack();
                } else {
                    this.setState({ errors:[response] });
                }
            } catch(error) {
                console.log(error);
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
                    <h1>Sign In</h1>
                    <Validation errors={this.state.errors} />
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" value={this.state.emailAddress} onChange={this.handleChange} />
                            </div>
                            <div>
                                <input id="password" name="password" type="password" className="" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                            </div>
                            <div className="grid-100 pad-bottom">
                                <button className="button" type="submit">Sign In</button>
                                <button className="button button-secondary" onClick={this.handleCancel}>Cancel</button>
                            </div>
                        </form>
                    </div>
                    <p>&nbsp;</p>
                    <p>Don't have a user account? <a href="/signup">Click here</a> to sign up!</p>
                </div>
            </div>
        );
    }
}

export default UserSignIn;
