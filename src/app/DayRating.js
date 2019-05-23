import React from 'react'
import styled from 'styled-components'

const StyledRatingInput = styled.label`
  display: flex;
  font-size: 1.5rem;
  justify-content: space-around;
  input {
    margin-right: 15px;
  }
`

export function DayRating() {
  const ratingOptions = [
    {
      rating: 3,
      output: '😃',
    },
    {
      rating: 2,
      output: '😶',
    },
    {
      rating: 1,
      output: '😔',
    },
  ]

  return (
    <StyledRatingInput>
      <ChooseRating options={ratingOptions} />
    </StyledRatingInput>
  )
}

function ChooseRating({ options }) {
  return options.map(option => (
    <label key={option.rating}>
      <input type="radio" name="dayrating" value={option.rating} />
      {option.output}
    </label>
  ))
}
