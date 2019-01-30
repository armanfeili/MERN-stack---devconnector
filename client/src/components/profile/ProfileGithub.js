import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ProfileGithub extends Component {
  // for setting up our application in github, we should google the 'github register application' and register our app
  // here, as 'devconnecter'. then, it give us a client id and a client secret, so we add then below

  // we don't want to fetch any data from redux, so we keep everything in state component
  constructor (props) {
    super(props);
    this.state = {
      clientId: '6e6b35962a066de25f9e',
      clientSecret: '8b5cd5db14761c424063b39375212438bf50bd91',
      count: 5,
      sort: 'created: asc',
      repos: []
    };
  }

  // now we want to make a request and get API
  // so we use fetch API to make this request, and not bring axios just for this request
  // things are comming in fetch() are just part of the api
  // fetch() just like axios, give us a promise back, so we can use then(), exept with fetch(), we get
  // a response and we have to map it to json
  componentDidMount () {
    const { username } = this.props;
    const { count, sort, clientId, clientSecret } = this.state;

    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then(res => res.json())
      .then(data => {
        if (this.refs.myRef) {
          this.setState({ repos: data });
        } // we're getting repos from this api and setting our state
      })
      .catch(err => console.log(err));
  }

  render () {
    const { repos } = this.state;

    // repo.id is comming from api
    const repoItems = repos.map(repo => (
      <div key={repo.id} className='card card-body mb-2'>
        <div className='row'>
          <div className='col-md-6'>
            {/* we should use <a> instead of <Link>*/}
            <h4><a
                  href={repo.html_url}
                  className='text-info'
                  target='_blank'
                  rel='noopener noreferrer'>{repo.name}</a></h4>
            <p>
              {repo.description}
            </p>
          </div>
          <div className='col-md-6'>
            <span className='badge badge-info mr-1'>Stars: {repo.stargazers_count}</span>
            <span className='badge badge-secondary mr-1'>Watchers: {repo.watchers_count}</span>
            <span className='badge badge-success'>Forks: {repo.forks_count}</span>
          </div>
        </div>
      </div>
    ));
    return (
      <div ref='myRef'>
        <hr />
        <h3 className='mb-4'>Latest Github Repos</h3>
        {repoItems}
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
};

export default ProfileGithub;
