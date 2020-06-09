import React, { Component } from 'react';
import './global.css';
import Router from './components/router';
import Header from './components/header';
import fetchRequest from './fetchRequest';

class App extends Component {
    constructor() {
        super();
        this.state = {
            currentUser:JSON.parse(localStorage.getItem('currentUser')) || null,
            credentials:localStorage.getItem('credentials') || null,
        }
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
    }
    
    signIn(emailAddress, password) {
        const credentials = btoa(`${emailAddress}:${password}`);
        return fetchRequest(`/users`, 'GET', null, true, credentials)
            .then(response => {
                if (!response.error) {
                    this.setState({currentUser:response})
                    localStorage.setItem('currentUser', JSON.stringify(response));
                    localStorage.setItem('credentials', credentials);
                }
                return response
            })
            .catch(error => {
                console.error('Error fetching and parsing data', error)
            })
    }
    
    signOut() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('credentials');
        this.setState({currentUser:null, credentials:null});
    }
    
    signUp(user) {
        console.log("create user "+user)
    }

    render() {
        return (
            <div id="root">
                <div>
                    <Header user={this.state.currentUser}/>
                    <br />
                    <Router signUp={this.signUp} signIn={this.signIn} signOut={this.signOut} user={this.state.currentUser} credentials={this.state.credentials}/>
                </div>
            </div>
        );
    }
}

export default App;
