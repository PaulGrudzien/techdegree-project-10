import React, { Component } from 'react';

class UserSignIn extends Component {
    constructor() {
        super();
        this.state = {emailAddress:"", password:""};
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
        this.props.signIn(this.state.emailAddress, this.state.password)
            .then(response => {
                if (response.error) {
                    console.log(response.message)
                } else {
                    this.props.history.goBack();
                }
            })
    }

    handleCancel(event) {
        event.preventDefault();
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
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
