import React from 'react'
import styled from 'styled-components'
import { EntryStatusIcons } from './EntryStatusIcons'
import { ShowDayRating } from './ShowDayRating'
import PropTypes from 'prop-types'
import moment from 'moment'
import 'moment/locale/de'
moment.locale('de')

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
const Iconbox = styled.div`
  grid-row: span 4;
  align-self: center;
  justify-self: center;
`
const StyledImage = styled.img`
  align-self: center;
  grid-column: 2 / 3;
  grid-row: span 4;
  justify-self: center;
  margin: 0 5px;
  padding: 5px;
`

export function DiaryEntryCardContent({ entry }) {
  return (
    <DiaryEntryContent>
      <Iconbox>
        <EntryStatusIcons entry={entry} />
      </Iconbox>
      <StyledImage src="./icons/diary-entry.png" alt="diary entry book icon" />
      <h2>Diary Entry from {moment(entry.date).format('L')}</h2>
      <h3>Topic of the day</h3>
      <h4>{entry.title || 'No Topic'}</h4>
      <ShowDayRating entryRating={entry.rating} />
    </DiaryEntryContent>
  )
}

DiaryEntryCardContent.propTypes = {
  entry: PropTypes.object,
}
