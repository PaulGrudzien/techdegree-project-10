import React, { Component } from 'react';
import './global.css';
import Router from './components/routes';

class App extends Component {
    
    createUser(user) {
        console.log("create user "+user)
    }

    render() {
        return (
            <div id="root">
                <div>
                    <div className="header">
                        <div className="bounds">
                            <h1 className="header--logo">Courses</h1>
                            <nav><a className="signup" href="/sign-up">Sign Up</a><a className="signin" href="/sign-in">Sign In</a></nav>
                        </div>
                    </div>
                    <br />
                    <Router  createUser={this.createUser} />
                </div>
            </div>
        );
    }
}

export default App;
