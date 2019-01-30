import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const SelectListGroup = ({name, value, error, info, onChange, options}) => {

  // first thing todo is take all options we passed in and loop them or map them to create options tags
  // options is an array of key:label and value:value
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <div className='form-group'>
      <select
        className={classnames('form-control form-control-lg', {
                     'is-invalid': error
                   })}
        name={name}
        value={value}
        onChange={onChange}>
        {selectOptions}
      </select>
      {info && <small className='form-text text-muted'>{info}</small>}
      {error && (
       <div className='invalid-feedback'>
         {error}
       </div>)}
    </div>
  );
};

SelectListGroup.propTypes = {
  // specifinig the types and which one is required
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  //   placeholder: PropTypes.string, - we don't need that here
  //   type: PropTypes.string.isRequired, - we don't need type for SelectListGroup
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired // options is an array
//   disabled: PropTypes.string - we don't need that
};

export default SelectListGroup;
