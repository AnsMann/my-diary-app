import React, { useState } from 'react'
import styled from 'styled-components'
import OutsideClickHandler from 'react-outside-click-handler'
import { Link } from 'react-router-dom'
import { ShowDayRating } from './ShowDayRating'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { DiaryEntryMenu } from './DiaryEntryMenu'
import { DeleteModalDialogue } from './DeleteModalDialogue'

library.add(faEllipsisH)

const CardLink = styled(Link)`
  text-decoration: none;
  overflow: hidden;
  height: 150px;
`

const DiaryEntryContent = styled.li`
  align-items: center;
  border: solid 1px #007fbf;
  border-radius: 10px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);
  display: grid;
  grid-template-columns: 0.8fr auto;
  grid-template-rows: repeat(4, 30px);
  height: 130px;
  list-style: none;

  h2,
  h3,
  h4 {
    color: #007fbf;
    font-size: 1rem;
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
  img {
    align-self: center;
    grid-row: span 4;
    justify-self: center;
    margin: 0 5px;
    padding: 5px;
  }
  span {
    font-size: 1.3rem;
    margin-left: 15px;
  }
`
const MenueIcon = styled.button`
  bottom: 50px;
  color: #002f47;
  font-size: 2rem;
  left: 80%;
  position: relative;
  section {
    font-size: 1.2rem;
  }
`
const DiaryEntryCard = styled.section``

export function DiaryEntry({ entry, history, onDeleteClick }) {
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)

  function handleDeleteMenuClick() {
    setIsDeleteModalVisible(true)
  }

  function resetDeleteModal() {
    setIsDeleteModalVisible(false)
  }

  return (
    <OutsideClickHandler onOutsideClick={() => setIsMenuVisible(false)}>
      {isDeleteModalVisible && (
        <DeleteModalDialogue
          entryId={entry.id}
          entryDate={entry.date}
          history={history}
          onDeleteConfirmation={onDeleteClick}
          onDeleteAbort={resetDeleteModal}
        />
      )}
      <DiaryEntryCard>
        <CardLink to={`/cards/${entry.id}`}>
          <DiaryEntryContent>
            <img src="./icons/diary-entry.png" alt="diary entry book icon" />
            <h2>Diary Entry from {entry.date}</h2>
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
              entryId={entry.id}
              onDeleteMenuClick={handleDeleteMenuClick}
            />
          )}
        </MenueIcon>
      </DiaryEntryCard>
    </OutsideClickHandler>
  )
}
