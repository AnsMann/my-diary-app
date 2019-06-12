import React from 'react'
import styled from 'styled-components'

const SettingsBox = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledLabel = styled.label`
  color: #007fbf;
  font-weight: bold;
`

const Switch = styled.label`
  color: #007fbf;
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
`

const Checkbox = styled.input.attrs(() => ({ type: 'checkbox' }))`
  &:checked + span {
    background-color: #2196f3;
  }
  &:focus + span {
    box-shadow: 0 0 1px #2196f3;
  }
  &:checked + span:before {
    transform: translateX(26px);
  }
`

const StyledSpan = styled.span`
  border-radius: 34px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  &:before {
    border-radius: 50%;
    position: absolute;
    content: '';
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
  }
`

/*
const Settingslabel = styled.label`
  color: #007fbf;
  font-weight: bold;
  height: 25px;
  position: relative;

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
*/

export function SettingsSetAnonymous({ anonymousCheckboxStatus, onCheck }) {
  return (
    <SettingsBox>
      <StyledLabel htmlFor="anymousCheckbox">Share as anonymous</StyledLabel>
      <Switch>
        <Checkbox
          id="anymousCheckbox"
          onChange={() => onCheck()}
          checked={anonymousCheckboxStatus}
        />
        <StyledSpan />
      </Switch>
    </SettingsBox>
  )
}

/* 
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
*/
