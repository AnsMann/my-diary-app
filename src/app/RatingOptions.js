import React from 'react'

export function RatingOptions({ options }) {
  return (
    <label>
      <input type="radio" name="dayrating" value={options.rating} />
      <span />
      {options.output}
    </label>
  )
}
