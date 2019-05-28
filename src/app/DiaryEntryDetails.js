import React from 'react'
import styled from 'styled-components'
import { ShowDayRating } from './ShowDayRating'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft as farArrowAltCircleLeft } from '@fortawesome/free-regular-svg-icons'
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'

library.add(farArrowAltCircleLeft, faLongArrowAltLeft)

const EntryDetails = styled.section`
  border: solid 1px #007fbf;
  border-radius: 10px;
  margin: 30px 20px 20px;
  padding: 20px;
  position: relativ;
  overflow: scroll;
  color: #007fbf;
  scroll h2,
  h3 {
    font-size: 1.2rem;
    justify-self: left;
  }
  h2 {
    font-size: 1.4rem;
  }
  p {
    color: #002f47;
    font-size: 1rem;
    margin: 10px;
  }
  span {
    font-size: 2rem;
  }
`

const ArrowBack = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3.5rem;
  position: absolute;
  top: 85px;
  left: 13px;
  z-index: 100;
  height: 60px;
  width: 80px;
  border: solid 2px #007fbf;
  color: #007fbf;
  border-radius: 20px;
  background-color: white;
`

export function DiaryEntryDetails({
  match,
  diaryEntries,
  handleBackClick,
  history,
  location,
}) {
  const entryIndex = findIndex(match.params.id, diaryEntries)
  const {
    title,
    date,
    rating,
    content,
    positive,
    negative,
    coachFeedback,
    additional,
  } = diaryEntries[entryIndex]
  console.log(
    'match:',
    match,
    'location key:',
    location.key,
    'history:',
    history
  )
  return (
    <EntryDetails>
      <ArrowBack onClick={() => handleBackClick(history)}>
        <FontAwesomeIcon icon={faLongArrowAltLeft} />
      </ArrowBack>
      <h2>Dear Diary from {date}</h2>
      <h3>Todays topic was</h3>
      <p>{title}</p>
      <h3>Die wichtigsten Inhalte heute waren</h3>
      <p>{content}</p>
      <h3>Besonders positiv erinner ich</h3>
      <p>{positive}</p>
      <h3>Besonders negativ erinner ich</h3>
      <p>{negative}</p>
      <h3>Meinem Coach würde ich sagen</h3>
      <p>{coachFeedback}</p>
      <h3>Außerdem war mir heute noch wichtig</h3>
      <p>{additional}</p>
      <ShowDayRating entryRating={rating} />
    </EntryDetails>
  )
}

function findIndex(id, diaryEntries) {
  const index = diaryEntries.map(entry => entry.id).indexOf(id)
  return index
}
