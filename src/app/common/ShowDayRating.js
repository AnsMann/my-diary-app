import React from 'react'
import PropTypes from 'prop-types'

export function ShowDayRating({ entryRating }) {
  return entryRating ? (
    <h3>
      This day was: <span>{evaluateRating(entryRating)}</span>
    </h3>
  ) : (
    <h3>No rating of this day</h3>
  )
}

function evaluateRating(rating) {
  const ratingMap = {
    1: '😔',
    2: '😶',
    3: '😃',
  }
  return ratingMap[rating]
}

ShowDayRating.propTypes = {
  entryRating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}
