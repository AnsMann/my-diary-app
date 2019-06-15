import React from 'react'
import styled from 'styled-components'

const SettingsBox = styled.section`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 50px 0;
`

const StyledLabel = styled.label`
  color: #007fbf;
  font-weight: bold;
`

const Switch = styled.label`
  display: inline-block;
  height: 34px;
  position: relative;
  width: 60px;
  input {
    height: 0;
    opacity: 0;
    width: 0;
  }
`

const Checkbox = styled.input.attrs(() => ({ type: 'checkbox' }))`
  &:checked + span {
    background-color: #007fbf;
  }
  &:focus + span {
    box-shadow: 0 0 1px #007fbf;
  }
  &:checked + span:before {
    transform: translateX(26px);
  }
`

const StyledSpan = styled.span`
  background-color: #ccc;
  bottom: 0;
  border-radius: 34px;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: 0.4s;
  &:before {
    background-color: white;
    border-radius: 50%;
    bottom: 4px;
    content: '';
    height: 26px;
    left: 4px;
    position: absolute;
    transition: 0.4s;
    width: 26px;
  }
`

export function SingleSetting({
  status,
  onCheck,
  settingFor,
  settingTitle,
  activateModal,
}) {
  return (
    <SettingsBox>
      <StyledLabel htmlFor={settingFor}>{settingTitle}</StyledLabel>
      <Switch>
        <Checkbox
          id={settingFor}
          onChange={() => {
            onCheck()
            status && activateModal()
          }}
          checked={status}
        />
        <StyledSpan />
      </Switch>
    </SettingsBox>
  )
}
