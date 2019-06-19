import React from 'react'
import PropTypes from 'prop-types'

export function RatingOptions({ options, isChecked }) {
  return (
    <label>
      <input
        type="radio"
        name="dayrating"
        value={options.rating}
        defaultChecked={isChecked}
      />
      <span />
      {options.output}
    </label>
  )
}

RatingOptions.propTypes = {
  options: PropTypes.object.isRequired,
  isChecked: PropTypes.bool.isRequired,
}
