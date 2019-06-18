import React, { useState } from 'react'
import styled from 'styled-components'
import { DeleteEntryModalDialogue } from './DeleteEntryModalDialogue'
import { deleteEntryInMongoDB } from './services'
import { ModalBackground } from './ModalBackground'
import { DiaryEntryCard } from './DiaryEntryCard'
import PropTypes from 'prop-types'

const ModalContainer = styled.div`
  left: 15vw;
  position: absolute;
  top: 50vw;
  height: 70vw;
  width: 70vw;
  z-index: 200;
`

export function DiaryEntry({
  entry,
  history,
  onDeleteClick,
  workOfflineStatus,
}) {
  const [isDeleteEntryModalVisible, setIsDeleteEntryModalVisible] = useState(
    false
  )
  const [deleteConfirmation, setDeleteConfirmation] = useState(true)

  function handleDeleteEntryMenuClick() {
    setIsDeleteEntryModalVisible(true)
  }

  function resetDeleteEntryModal() {
    setIsDeleteEntryModalVisible(false)
    setDeleteConfirmation(true)
  }

  function handleDeleteEntryConfirmation() {
    if (workOfflineStatus) {
      if (entry.id) {
        onDeleteClick(entry.id, history)
        resetDeleteEntryModal()
      } else {
        const entryToDelete = { ...entry, toDelete: true }
        onDeleteClick(entry._id, history, entryToDelete)
        resetDeleteEntryModal()
      }
    } else {
      deleteEntryInMongoDB(entry._id).then(res => {
        if (res._id) {
          onDeleteClick(entry._id, history)
          resetDeleteEntryModal()
        } else {
          setDeleteConfirmation(false)
        }
      })
    }
  }

  return (
    <>
      <DiaryEntryCard
        DeleteMenuClick={handleDeleteEntryMenuClick}
        history={history}
        entry={entry}
      />
      {isDeleteEntryModalVisible && (
        <>
          <ModalBackground />
          <ModalContainer>
            <DeleteEntryModalDialogue
              entryDate={entry.date}
              onDeleteConfirmation={handleDeleteEntryConfirmation}
              resetDeleteEntryModal={resetDeleteEntryModal}
              deleteConfirmation={deleteConfirmation}
            />
          </ModalContainer>
        </>
      )}
    </>
  )
}

DiaryEntry.propTypes = {
  entry: PropTypes.object,
  history: PropTypes.object.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  workOfflineStatus: PropTypes.bool.isRequired,
}
