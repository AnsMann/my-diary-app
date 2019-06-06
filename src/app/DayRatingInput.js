import React from 'react'
import styled from 'styled-components'
import { RatingOptions } from './RatingOptions'

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

export function DayRatingInput() {
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
      {ratingOptions.map(option => (
        <RatingOptions key={option.rating} options={option} />
      ))}
    </StyledRatingInput>
  )
}
