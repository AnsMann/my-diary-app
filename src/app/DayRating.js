import React from 'react'
import styled from 'styled-components'

const StyledRatingInput = styled.div`
  display: flex;
  font-size: 1.5rem;
  justify-content: space-around;
  padding: 1px;
  input {
    margin-right: 15px;
    display: none;
    &:checked + span {
      border-color: #007fbf;
      &:after {
        transform: scale(1);
      }
    }
  }
  label {
    position: relative;
  }
  span {
    position: relative;
    display: block;
    float: left;
    margin-right: 10px;
    width: 20px;
    height: 20px;
    border: 2px solid #007fbf;
    border-radius: 50%;
    top: 5px;
    &:after {
      content: '';
      position: absolute;
      top: 3px;
      left: 3px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #007fbf;
      transform: scale(0);
      transition: all 0.2s ease;
    }
  }
`

export function DayRating() {
  const ratingOptions = [
    {
      rating: '3',
      output: '😃',
    },
    {
      rating: '2',
      output: '😶',
    },
    {
      rating: '1',
      output: '😔',
    },
  ]

  return (
    <StyledRatingInput>
      <RatingOptions options={ratingOptions} />
    </StyledRatingInput>
  )
}

function RatingOptions({ options }) {
  return options.map(option => (
    <label key={option.rating}>
      <input type="radio" name="dayrating" value={option.rating} />
      <span />
      {option.output}
    </label>
  ))
}
