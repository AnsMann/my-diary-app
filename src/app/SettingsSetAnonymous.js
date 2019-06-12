import React from 'react'
import styled from 'styled-components'

const Settingslabel = styled.label`
  color: #007fbf;
  position: relative;
  height: 25px;

  &:after {
    content: '';
    display: inline-block;
    height: 25px;
    width: 25px;
    border: 2px solid #007fbf;
    position: absolute;
    right: -100px;
    top: -5px;
    border-radius: 10px;
  }
  &:before {
    content: '';
    display: inline-block;
    height: 7px;
    width: 15px;
    border-left: 4px solid;
    border-bottom: 4px solid;
    transform: rotate(-45deg);
    position: absolute;
    right: -95px;
    top: 2px;
  }
`
const Checkbox = styled.input.attrs(() => ({ type: 'checkbox' }))`
  opacity: 0;

  + label:before {
    content: none;
  }

  &:checked + label:before {
    content: '';
  }
`

export function SettingsSetAnonymous({ anonymousCheckboxStatus, onCheck }) {
  return (
    <>
      <Checkbox
        id="anymousCheckbox"
        onChange={() => onCheck()}
        checked={anonymousCheckboxStatus}
      />
      <Settingslabel htmlFor="anymousCheckbox">
        Share as anonymous
      </Settingslabel>
    </>
  )
}
