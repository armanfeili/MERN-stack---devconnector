import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// BrowserRouter is used for preparing this ability to use button of browser to go back and forward to last and next page

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';

import Register from './components/auth/register';
import Login from './components/auth/login';

import './App.css'; // This is actually where we're going to put our own custom global CSS.

class App extends Component {
  render () {
    return (
      <Router>
        {/* Router here is actualy BrowserRouter */}
        <div className='App'>
          {/* Navbar and Footer always display but Landing is sth we want to display in "/" route. so we used <Route /> */}
          <Navbar/>
          <Route exact path='/' component={Landing} />
          {/* exact keyword helps to show component at exacly this specific route */}
          <div className='container'>
            <Route exact path='/register' component={Register} />
            <Route exact path='/Login' component={Login} />
          </div>
          <Footer/>
        </div>
      </Router>
    );
  }
}

export default App;
