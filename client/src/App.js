import React, { Component } from 'react';
import './global.css';
import Router from './components/Router';
import Header from './components/Header';
import fetchRequest from './fetchRequest';

class App extends Component {
    constructor() {
        super();
        this.state = {
            currentUser:JSON.parse(localStorage.getItem('currentUser')) || null,
            credentials:localStorage.getItem('credentials') || null,
        }
        this.signIn = this.signIn.bind(this);
        this.signUp = this.signUp.bind(this);
        this.signOut = this.signOut.bind(this);
    }
    
    async signIn(emailAddress, password) {
        try {
            const credentials = btoa(`${emailAddress}:${password}`);
            const response = await fetchRequest(`/users`, 'GET', null, true, credentials)
            if (response.status === 200 || response.status === 304) {
                const currentUser = await response.json()
                this.setState({currentUser})
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                localStorage.setItem('credentials', credentials);
                return "Ok"
            } else if (response.status === 401) {
                return "Oops, email address or password is invalid!"
            } else {
                throw new Error();
            }
        } catch (error) {
            console.error('Error fetching and parsing data', error)
            window.location='/error';
        }
    } 
    
    signOut() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('credentials');
        this.setState({currentUser:null, credentials:null});
    }
    
    async signUp(user) {
        try {
            const response = await fetchRequest(`/users`, 'POST', user)
            if (response.status === 201) {
                this.signIn(user.emailAddress, user.password);
                return []
            } else if (response.status === 400) {
                const error = await response.json()
                return error.errors;
            } else {
                throw new Error();
            }
        } catch(error) {
            console.error('Error fetching and parsing data', error)
            window.location='/error';
        }
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
