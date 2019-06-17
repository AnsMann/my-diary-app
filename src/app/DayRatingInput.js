import React from 'react'
import styled from 'styled-components'
import { RatingOptions } from './RatingOptions'
import PropTypes from 'prop-types'

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

export function DayRatingInput({ defaultValue = 0 }) {
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
      {ratingOptions.map(option =>
        defaultValue === option.rating ? (
          <RatingOptions
            key={option.rating}
            options={option}
            isChecked={true}
          />
        ) : (
          <RatingOptions
            key={option.rating}
            options={option}
            isChecked={false}
          />
        )
      )}
    </StyledRatingInput>
  )
}

DayRatingInput.propTypes = {
  defaultValue: PropTypes.number,
}
