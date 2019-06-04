import React, { useState } from 'react'
import styled from 'styled-components'
import OutsideClickHandler from 'react-outside-click-handler'
import { Link } from 'react-router-dom'
import { ShowDayRating } from './ShowDayRating'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { DiaryEntryMenu } from './DiaryEntryMenu'

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
  bottom: 10%;
  color: #002f47;
  font-size: 2rem;
  left: 80%;
  position: absolute;
  section {
    font-size: 1.2rem;
  }
`

const SlackLogo = styled.img`
  width: 15%;
  position: absolute;
  top: -25px;
  left: 0px;
`

const DiaryEntryCard = styled.section`
  position: relative;
  margin-bottom: 30px;
`

export function DiaryEntry({ entry, history }) {
  const [showMenu, setShowMenu] = useState(false)
  return (
    <OutsideClickHandler onOutsideClick={() => setShowMenu(false)}>
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
        {entry.shared.status && <SlackLogo src="/icons/Slack_Mark_Web.png" />}
        <MenueIcon onClick={() => setShowMenu(!showMenu)}>
          <FontAwesomeIcon icon={faEllipsisH} />
          {showMenu && <DiaryEntryMenu history={history} entryId={entry.id} />}
        </MenueIcon>
      </DiaryEntryCard>
    </OutsideClickHandler>
  )
}
