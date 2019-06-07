import React from 'react'
import styled from 'styled-components'
import { Header } from './Header'
import { SettingsSetAnonymous } from './SettingsSetAnonymous'

const SettingsContainer = styled.ul`
  overflow: scroll;
  padding: 20px;
`

export function Settings() {
  return (
    <>
      <Header title={'Settings'} />
      <SettingsContainer>
        <SettingsSetAnonymous />
      </SettingsContainer>
    </>
  )
}
