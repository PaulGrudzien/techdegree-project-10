import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

async function fetchRequest(url) {
    try {
        let response = await fetch(url);
        let data = await response.json();
        return data;
    } catch(error) {
        console.error(error)
    }
}

class App extends Component {
  constructor() {
    super();
    this.state = {courses:[]}
  }

  componentDidMount() {
      fetchRequest('http://localhost:5000/api/courses')
        .then(courses => this.setState({courses}))
        .catch(error => console.error('Error fetching and parsing data', error));
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
            Courses list :
        </p>
        <ul>
          {this.state.courses.map(course => <li key={course.id}>{course.title}</li>)}
        </ul>
      </div>
    );
  }
}

export default App;
