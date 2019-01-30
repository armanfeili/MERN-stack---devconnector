import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// BrowserRouter is used for preparing this ability to use button of browser to go back and forward to last and next page
import { Provider } from 'react-redux';
// Provider is actually a React component,and it provides our application with store which holds our application state
// so it should wrap around all of our App , even the <Router>, and it takes in our store
// for creating store, we use a method called creatStore() and it gets 3 arguments: 1)root reducer of combineReducers 2)initial state 3)enhancer like applyMiddleware()
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

// we import PrivateRoute component , so we use this for private routes instead of <Route />
import PrivateRoute from './components/common/PrivateRoute';

import CreateProfile from './components/create-profile/CreateProfile';

import './App.css'; // This is actually where we're going to put our own custom global CSS.
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';

import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';

import NotFound from './components/not-found/NotFound';

import Posts from './components/posts/Posts';
import Post from './components/post/Post';

// here we want to add token to localStorage , get the user info and expiration time and turn isAuthenticated to true
// so if we reload the page, we still have token,userInfo and isAuthenticated

// Check for token - if we go to browser>inspect>Application>Local Storage , we can see our token 
if (localStorage.jwtToken) {
  // Set auth token header as Authorization
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and expirationTime, so all that unreadable token is now readable
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user data and isAuthenticated to true in reducer state 
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
              <Route exact path='/profiles' component={Profiles} />
              <Route exact path='/profile/:handle' component={Profile} />
              <Switch>
                {/* for every private route we just need to wrap it in <switch>, and it prevent from strange redirect issues*/}
                <PrivateRoute exact path='/dashboard' component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute exact path='/create-profile' component={CreateProfile} />
              </Switch>
              <Switch>
                <PrivateRoute exact path='/edit-profile' component={EditProfile} />
              </Switch>
              <Switch>
                <PrivateRoute exact path='/add-experience' component={AddExperience} />
              </Switch>
              <Switch>
                <PrivateRoute exact path='/add-education' component={AddEducation} />
              </Switch>
              {/* posts are going to be private routes */}
              <Switch>
                <PrivateRoute exact path='/feed' component={Posts} />
              </Switch>
              <Switch>
                <PrivateRoute exact path='/post/:id' component={Post} />
              </Switch>
              <Route exact path='/not-found' component={NotFound} />
            </div>
            <Footer/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
