import React, { useState } from 'react'
import styled from 'styled-components'
import OutsideClickHandler from 'react-outside-click-handler'
import { Link } from 'react-router-dom'
import { ShowDayRating } from './ShowDayRating'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEllipsisH,
  faTrashAlt,
  faDatabase,
} from '@fortawesome/free-solid-svg-icons'
import { DiaryEntryMenu } from './DiaryEntryMenu'
import { DeleteEntryModalDialogue } from './DeleteEntryModalDialogue'
import moment from 'moment'
import 'moment/locale/de'
import { deleteEntryInMongoDB } from './services'
moment.locale('de')

library.add(faEllipsisH, faTrashAlt)

const CardLink = styled(Link)`
  text-decoration: none;
  overflow: hidden;
`

const DiaryEntryContent = styled.li`
  align-items: center;
  background: white;
  border: solid 1px #007fbf;
  border-radius: 10px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);
  display: grid;
  grid-template-columns: 0.5fr 0.8fr auto;
  grid-template-rows: repeat(4, 30px);
  height: 130px;
  list-style: none;
  padding: 5px;

  h2,
  h3,
  h4 {
    color: #007fbf;
    font-size: 1rem;
    grid-column: 3;
    justify-self: left;
    margin: 0;
    padding: 5px;
  }
  h3 {
    font-size: 0.8rem;
  }
  h4 {
    color: #002f47;
    font-size: 0.8rem;
  }
  span {
    font-size: 1.3rem;
    margin-left: 15px;
  }
`
const MenueIcon = styled.button`
  bottom: 1%;
  color: #002f47;
  font-size: 1.5rem;
  left: 85%;
  position: absolute;
  section {
    font-size: 1.2rem;
  }
`
const StyledImage = styled.img`
  align-self: center;
  grid-column: 2 / 3;
  grid-row: span 4;
  justify-self: center;
  margin: 0 5px;
  padding: 5px;
`

const SlackLogo = styled.img`
  width: 21px;
  position: relative;
  left: -2px;
  margin-bottom: 3px;
`
const DatabaseIcon = styled.div`
  color: #002f47;
  width: 15%;
  margin-bottom: 5px;
`
const DatabaseIconLight = styled.div`
  color: #002f47;
  opacity: 0.3;
  width: 15%;
  margin-bottom: 5px;
`

const ToDeleteIcon = styled.div`
  color: red;
  width: 15%;
`

const DiaryEntryCard = styled.section`
  position: relative;
  margin-bottom: 30px;
`

const Iconbox = styled.div`
  grid-row: span 4;
  align-self: center;
  justify-self: center;
`

export function DiaryEntry({
  entry,
  history,
  onDeleteClick,
  workOfflineStatus,
}) {
  const [isMenuVisible, setIsMenuVisible] = useState(false)
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
    <OutsideClickHandler onOutsideClick={() => setIsMenuVisible(false)}>
      {isDeleteEntryModalVisible && (
        <DeleteEntryModalDialogue
          entryDate={entry.date}
          onDeleteConfirmation={handleDeleteEntryConfirmation}
          resetDeleteEntryModal={resetDeleteEntryModal}
          deleteConfirmation={deleteConfirmation}
        />
      )}
      <DiaryEntryCard>
        <CardLink to={`/entries/${entry._id || entry.id}`}>
          <DiaryEntryContent>
            <Iconbox>
              {entry.shared.status && (
                <SlackLogo src="/icons/slacklogo-klein.png" />
              )}
              {entry.inDatabase ? (
                <DatabaseIcon>
                  <FontAwesomeIcon icon={faDatabase} />
                </DatabaseIcon>
              ) : (
                <DatabaseIconLight>
                  <FontAwesomeIcon icon={faDatabase} />
                </DatabaseIconLight>
              )}
              {entry.toDelete && (
                <ToDeleteIcon>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </ToDeleteIcon>
              )}
            </Iconbox>
            <StyledImage
              src="./icons/diary-entry.png"
              alt="diary entry book icon"
            />
            <h2>Diary Entry from {moment(entry.date).format('L')}</h2>
            <h3>Topic of the day</h3>
            <h4>{entry.title || 'No Topic'}</h4>
            <ShowDayRating entryRating={entry.rating} />
          </DiaryEntryContent>
        </CardLink>
        <MenueIcon onClick={() => setIsMenuVisible(!isMenuVisible)}>
          <FontAwesomeIcon icon={faEllipsisH} />
          {isMenuVisible && (
            <DiaryEntryMenu
              history={history}
              entryId={entry._id || entry.id}
              onDeleteMenuClick={handleDeleteEntryMenuClick}
            />
          )}
        </MenueIcon>
      </DiaryEntryCard>
    </OutsideClickHandler>
  )
}
