import React from 'react'
import styled from 'styled-components'
import { Header } from './Header'
import { SettingsSetAnonymous } from './SettingsSetAnonymous'

const SettingsContainer = styled.ul`
  overflow: scroll;
  padding: 20px;
`

export function Settings({
  anonymousCheckboxStatus,
  onAnonymousCheckboxClick,
  onLocalStorageCheckboxClick,
  LocalStorageCheckboxStatus,
}) {
  return (
    <>
      <Header title={'Settings'} />
      <SettingsContainer>
        <SettingsSetAnonymous
          status={anonymousCheckboxStatus}
          onCheck={onAnonymousCheckboxClick}
          settingFor={'anymousCheckbox'}
          settingTitle={'Share as anonymous'}
        />
        <SettingsSetAnonymous
          status={LocalStorageCheckboxStatus}
          onCheck={onLocalStorageCheckboxClick}
          settingFor={'localStorageCheckbox'}
          settingTitle={'Use local storage'}
        />
      </SettingsContainer>
    </>
  )
}
