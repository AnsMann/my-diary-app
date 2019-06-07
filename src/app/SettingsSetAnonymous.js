import React from 'react'
import styled from 'styled-components'

const Settingslabel = styled.label`
  color: #007fbf;
`

export function SettingsSetAnonymous() {
  return (
    <Settingslabel>
      Share diary entry as anonymous
      <input type="checkbox" />
    </Settingslabel>
  )
}
