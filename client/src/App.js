import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Nav from './components/Nav';
import Home from './components/Home';
import Users from './components/Users';
import UserCard from './components/UserCard';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>User Tracking App</h1>
        <Nav />
        <Route exact path='/' component={Home} />
        <Route exact path='/users' component={Users} />
        <Route path='/users/:id' component={UserCard} />
      </div>
    </Router>
  );
}

export default App;
