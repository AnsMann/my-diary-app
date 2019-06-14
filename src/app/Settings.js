import React from 'react'
import styled from 'styled-components'
import { Header } from './Header'
import { SettingsSetAnonymous } from './SettingsSetAnonymous'

const SettingsContainer = styled.ul`
  overflow: scroll;
  padding: 20px;
`
const SyncButton = styled.button`
  background: #007fbf;
  border-radius: 10px;
  color: #ffffff;
  font-size: 1.5rem;
  height: 40px;
  width: 100%;
  &:disabled {
    background: grey;
  }
`

export function Settings({
  anonymousCheckboxStatus,
  onAnonymousCheckboxClick,
  onworkOfflineCheckboxClick,
  workOfflineCheckboxStatus,
  onSyncButtonClick,
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
          status={workOfflineCheckboxStatus}
          onCheck={onworkOfflineCheckboxClick}
          settingFor={'localStorageCheckbox'}
          settingTitle={'Work offline'}
        />
        <SyncButton
          onClick={() => onSyncButtonClick()}
          disabled={!workOfflineCheckboxStatus}
        >
          Sync with database
        </SyncButton>
      </SettingsContainer>
    </>
  )
}
