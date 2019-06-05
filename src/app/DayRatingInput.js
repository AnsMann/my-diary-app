import React, { useState } from 'react'
import styled from 'styled-components'
import { findIndex } from './utils'

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

export function DayRatingInput({ defaultValue = false, onEditRating = false }) {
  const ratingOptions = [
    {
      rating: '3',
      output: '😃',
      default: false,
    },
    {
      rating: '2',
      output: '😶',
      default: false,
    },
    {
      rating: '1',
      output: '😔',
      default: false,
    },
  ]
  let ratingOptionsWithDefault = false
  if (defaultValue) {
    ratingOptionsWithDefault = changeRationOptions(ratingOptions, defaultValue)
  }
  return (
    <StyledRatingInput>
      {ratingOptionsWithDefault
        ? ratingOptionsWithDefault.map(option => (
            <RatingOptions
              key={option.rating}
              options={option}
              onEditRating={onEditRating}
            />
          ))
        : ratingOptions.map(option => (
            <RatingOptions
              key={option.rating}
              options={option}
              onEditRating={onEditRating}
            />
          ))}
    </StyledRatingInput>
  )
}

function RatingOptions({ options, onEditRating }) {
  const [isChecked, setIsChecked] = useState(options.default)
  return (
    <label>
      <input
        onChange={event => {
          onEditRating && onEditRating(event.target)
          setIsChecked(!isChecked)
        }}
        type="radio"
        name="dayrating"
        value={options.rating}
        checked={isChecked}
      />
      <span />
      {options.output}
    </label>
  )
}

function changeRationOptions(ratingOptions, defaultValue) {
  const index = ratingOptions.map(option => option.rating).indexOf(defaultValue)
  const Rating = ratingOptions[index]
  console.log(Rating)
  const RatingToCheck = {
    ...Rating,
    default: true,
  }
  const ratingWithDefault = [
    ...ratingOptions.slice(0, index),
    RatingToCheck,
    ...ratingOptions.slice(index + 1),
  ]
  return ratingWithDefault
}
