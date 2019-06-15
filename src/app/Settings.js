import React, { useState } from 'react'
import styled from 'styled-components'
import { Header } from './Header'
import { SingleSetting } from './SingleSetting'
import { SettingsModalDialogue } from './SettingsModalDialogue'

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
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false)

  function activateModal() {
    setIsSettingsModalVisible(true)
  }
  function resetModal() {
    setIsSettingsModalVisible(false)
  }
  return (
    <>
      <Header title={'Settings'} />
      {isSettingsModalVisible && (
        <SettingsModalDialogue
          onConfirmationClick={onSyncButtonClick}
          resetModal={resetModal}
        />
      )}
      <SettingsContainer>
        <SingleSetting
          status={anonymousCheckboxStatus}
          onCheck={onAnonymousCheckboxClick}
          settingFor={'anymousCheckbox'}
          settingTitle={'Share as anonymous'}
          activateModal={resetModal}
        />
        <SingleSetting
          status={workOfflineCheckboxStatus}
          onCheck={onworkOfflineCheckboxClick}
          settingFor={'workOfflineCheckbox'}
          settingTitle={'Work offline'}
          activateModal={activateModal}
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
