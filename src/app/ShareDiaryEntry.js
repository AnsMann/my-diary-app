import React, { useState } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import 'moment/locale/de'

import { findIndex, editEntriesInMongoDB } from './utils'
import { sendMessage } from './services'
import { Header } from './Header'
import { ShareModalDialogue } from './ShareModalDialogue'
import { ModalBackground } from './ModalBackground'
import { ShareOverview } from './ShareOverview'
import PropTypes from 'prop-types'

const ShareContainer = styled.section`
  align-items: center;
  color: #007fbf;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;

  h2 {
    margin-top: 23px;
    font-size: 1.4rem;
  }
  p {
    margin-top: 0;
  }
`

const ModalContainer = styled.div`
  left: 20vw;
  position: absolute;
  top: 50vw;
  width: 60vw;
  z-index: 200;
  height: 60vw;
`

export function ShareDiaryEntry({
  diaryID,
  diaryEntries,
  history,
  onBackClick,
  onShare,
  sendAnonymous,
  workOfflineStatus,
}) {
  const [modalStatus, setModalStatus] = useState({
    showModal: false,
    shareWith: '',
  })

  const entryIndex = findIndex(diaryID, diaryEntries)
  const diaryEntryToShare = diaryEntries[entryIndex]

  function handleContactClick(contactId, contactName, AnonymousStatus) {
    sendMessage(diaryEntryToShare, contactId, AnonymousStatus).then(res => {
      res.ok
        ? setModalStatus({ showModal: true, shareWith: contactName })
        : setModalStatus({ showModal: true, shareWith: '' })
    })
  }

  async function handleModalButtonClick(success, contactName) {
    if (success) {
      const sharedDiaryEntry = {
        ...diaryEntryToShare,
        shared: {
          status: true,
          sharedWith: contactName,
          sharedOn: moment()._d,
        },
      }
      const newDiaryEntries = await editEntriesInMongoDB(
        diaryEntries,
        sharedDiaryEntry,
        entryIndex
      )
      onShare(newDiaryEntries)
    } else {
      setModalStatus({ showModal: false, shareWith: '' })
    }
    history.push('/')
  }

  return (
    <>
      <Header title={'Share via slack'} />
      {modalStatus.showModal && (
        <>
          <ModalBackground />
          <ModalContainer>
            <ShareModalDialogue
              onModalButtonClick={handleModalButtonClick}
              shareWith={modalStatus.shareWith}
            />
          </ModalContainer>
        </>
      )}
      <ShareContainer>
        <ShareOverview
          onContactClick={handleContactClick}
          onBackClick={onBackClick}
          sendAnonymous={sendAnonymous}
          workOfflineStatus={workOfflineStatus}
          history={history}
          diaryEntryToShare={diaryEntryToShare}
        />
      </ShareContainer>
    </>
  )
}

ShareDiaryEntry.propTypes = {
  diaryID: PropTypes.string.isRequired,
  diaryEntries: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  onBackClick: PropTypes.func.isRequired,
  onShare: PropTypes.func.isRequired,
  sendAnonymous: PropTypes.bool.isRequired,
  workOfflineStatus: PropTypes.bool.isRequired,
}
