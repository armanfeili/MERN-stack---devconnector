import React from 'react';

export default () => {
  // this file is responsible for routes than does not exist. like: http://localhost:5000/profile/Ronaldo
  return (
    <div>
      <h1 className='display-4 componentBody'>Page Not Found</h1>
      <p>
        Sorry, this page does not exist
      </p>
    </div>
  );
};
