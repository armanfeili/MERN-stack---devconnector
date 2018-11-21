import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// BrowserRouter is used for preparing this ability to use button of browser to go back and forward to last and next page
import { Provider } from 'react-redux';
// Provider is actually a React component,and it provides our application with store which holds our application state
// so it should wrap around all of our App , even the <Router>, and it take in our store
// for creating store, we use a method called creatStore() and it get 3 arguments: 1)root reducer of combineReducers 2)initial state 3)enhancer like applyMiddleware()
import store from './store';
// store is created in seprate file

// **** this part is for setting token to all private route if user loged in *****/
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';
// *******************************************************************************/

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';

import Register from './components/auth/register';
import Login from './components/auth/login';
import Dashboard from './components/dashboard/Dashboard';

import './App.css'; // This is actually where we're going to put our own custom global CSS.

// here we want to add token to localStorage , get the user info and expiration time and turn isAuthenticated to true
// so if we reload the page, we still have token,userInfo and isAuthenticated

// Check for token - if we go to browser>inspect>Application>Local Storage , we can see our token 
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and expirationTime
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // setCurrentUser is actually an action, which because of we exported it,
  // we can call it to dispatch decoded token to reducer and finally update the state.
  // we used store to dispatch an action to reducers

  // Check for expired token
  const currentTime = Date.now() / 1000; // now it is 'second' base
  if (decoded.exp < currentTime) {
    // we sat exp to 3600s , so it checks current time and if it was grater
    // than (the time user logedin + 3600s), it will logout the user

    // Logout user 
    store.dispatch(logoutUser());
    // Clear current profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router>
          {/* Router here is actualy BrowserRouter */}
          <div className='App'>
            {/* Navbar and Footer always display but Landing is sth we want to display in "/" route. so we used <Route /> */}
            <Navbar/>
            <Route exact path='/' component={Landing} />
            {/* exact keyword helps to show component at exacly this specific route */}
            <div className='container'>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/dashboard' component={Dashboard} />
            </div>
            <Footer/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
