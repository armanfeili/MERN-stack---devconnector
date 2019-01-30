import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const InputGroun = ({name, value, placeholder, error, icon, type, onChange}) => {

  return (
    <div className='input-group mb-3'>
      <div className='input-group-prepend'>
        <span className='input-group-text'><i className={icon}></i></span>
      </div>
      <input
        className={classnames('form-control form-control-lg', {
                     'is-invalid': error
                   })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange} />
      {error && (
       <div className='invalid-feedback'>
         {error}
       </div>)}
    </div>
  );
};

InputGroun.propTypes = {
  // specifinig the types and which one is required
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired, // we need types
  icon: PropTypes.string, // we need icon
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
//   disabled: PropTypes.string - we don't need that
};

InputGroun.defaultProps = {
  type: 'text'
};

export default InputGroun;
