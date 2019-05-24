import React from 'react'
import styled from 'styled-components'

const StyledRatingInput = styled.div`
  display: flex;
  font-size: 1.5rem;
  justify-content: space-around;
  padding: 1px;
  input {
    display: none;
    margin-right: 15px;
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
    border: 2px solid #007fbf;
    border-radius: 50%;
    display: block;
    float: left;
    height: 20px;
    margin-right: 10px;
    position: relative;
    top: 5px;
    width: 20px;
    &:after {
      background: #007fbf;
      border-radius: 50%;
      content: '';
      height: 10px;
      left: 3px;
      position: absolute;
      top: 3px;
      transform: scale(0);
      transition: all 0.2s ease;
      width: 10px;
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
