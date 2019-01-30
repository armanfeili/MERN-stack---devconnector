import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextAreaFieldGroup = ({name, value, placeholder, error, info, onChange}) => {

  return (
    <div className='form-group'>
      <textarea
        className={classnames('form-control form-control-lg', {
                     'is-invalid': error
                   })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange} />
      {info && <small className='form-text text-muted'>{info}</small>}
      {error && (
       <div className='invalid-feedback'>
         {error}
       </div>)}
    </div>
  );
};

TextAreaFieldGroup.propTypes = {
  // specifinig the types and which one is required
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  //   type: PropTypes.string.isRequired, - we don't need type for TextAreaFieldGroup
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
//   disabled: PropTypes.string - we don't need that
};

export default TextAreaFieldGroup;
