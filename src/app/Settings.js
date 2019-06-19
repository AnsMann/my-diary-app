import React, { useState } from 'react'
import styled from 'styled-components'
import { Header } from './Header'
import { SingleSetting } from './SingleSetting'
import { SettingsModalDialogue } from './SettingsModalDialogue'
import {
  deleteOnSync,
  patchOnSync,
  postOnSync,
  getEntriesFromMongoDB,
} from './services'
import { SyncConfirmationModalDialogue } from './SyncConfirmationModalDialogue'
import { SyncFailedModalDialogue } from './SyncFailedModalDialogue'
import PropTypes from 'prop-types'
import { ModalBackground } from './ModalBackground'

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

const ModalContainer = styled.div`
  top: 50vw;
  width: 75vw;
  z-index: 200;
  left: 13vw;
  position: absolute;
  height: 60vw;
`

export function Settings({
  history,
  anonymousCheckboxStatus,
  onAnonymousCheckboxClick,
  onworkOfflineCheckboxClick,
  workOfflineCheckboxStatus,
  onSyncButtonClick,
  diaryEntries,
}) {
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false)
  const [isSyncConfirmationVisible, setIsSyncConfirmationVisible] = useState(
    false
  )
  const [isSyncFailedVisible, setIsSyncFailedVisible] = useState(false)

  function activateModal() {
    setIsSettingsModalVisible(true)
  }
  function resetModal() {
    setIsSettingsModalVisible(false)
  }
  async function SyncWithDatabase() {
    await deleteOnSync(diaryEntries)
    await patchOnSync(diaryEntries)
    await postOnSync(diaryEntries)
    const updatedEntries = await getEntriesFromMongoDB()
    if (updatedEntries.name) {
      setIsSyncFailedVisible(true)
      workOfflineCheckboxStatus || onworkOfflineCheckboxClick()
    } else {
      onSyncButtonClick(updatedEntries)
    }
  }

  return (
    <>
      <Header title={'Settings'} />
      {isSettingsModalVisible && (
        <>
          <ModalBackground />
          <ModalContainer>
            <SettingsModalDialogue
              SyncWithDatabase={SyncWithDatabase}
              resetModal={resetModal}
            />
          </ModalContainer>
        </>
      )}
      {isSyncConfirmationVisible && (
        <>
          <ModalBackground />
          <ModalContainer>
            <SyncConfirmationModalDialogue history={history} />
          </ModalContainer>
        </>
      )}
      {isSyncFailedVisible && (
        <>
          <ModalBackground />
          <ModalContainer>
            <SyncFailedModalDialogue history={history} />
          </ModalContainer>
        </>
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
          onClick={() => {
            SyncWithDatabase()
            setIsSyncConfirmationVisible(true)
          }}
          disabled={!workOfflineCheckboxStatus}
        >
          Sync with database
        </SyncButton>
      </SettingsContainer>
    </>
  )
}

Settings.propTypes = {
  history: PropTypes.object.isRequired,
  anonymousCheckboxStatus: PropTypes.bool.isRequired,
  onAnonymousCheckboxClick: PropTypes.func.isRequired,
  onworkOfflineCheckboxClick: PropTypes.func.isRequired,
  workOfflineCheckboxStatus: PropTypes.bool.isRequired,
  onSyncButtonClick: PropTypes.func.isRequired,
  diaryEntries: PropTypes.array.isRequired,
}
