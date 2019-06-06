import React from 'react'

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
