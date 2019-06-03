import React from 'react'
import styled from 'styled-components'
import { ShowDayRating } from './ShowDayRating'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft as farArrowAltCircleLeft } from '@fortawesome/free-regular-svg-icons'
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'
import { findIndex } from './utils'
import { Header } from './Header'
import { ShareViaSlackButton } from './ShareViaSlackButton'
import { ShareViaMailButton } from './ShareViaMailButton'

library.add(farArrowAltCircleLeft, faLongArrowAltLeft)

const EntryDetails = styled.section`
  border: solid 1px #007fbf;
  border-radius: 10px;
  color: #007fbf;
  margin: 30px 20px 20px;
  overflow: scroll;
  padding: 20px;
  h2,
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
  align-items: center;
  background-color: white;
  border: solid 2px #007fbf;
  border-radius: 20px;
  color: #007fbf;
  display: flex;
  font-size: 3.5rem;
  height: 60px;
  justify-content: center;
  left: 13px;
  position: absolute;
  top: 85px;
  width: 80px;
  z-index: 100;
`

const Share = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`

export function DiaryEntryDetails({
  match,
  diaryEntries,
  handleBackClick,
  history,
}) {
  const entryIndex = findIndex(match.params.id, diaryEntries)
  const {
    id,
    title,
    date,
    rating,
    content,
    positive,
    negative,
    coachFeedback,
    additional,
  } = diaryEntries[entryIndex]

  const message = `<h2>Dear Diary from ${date}</h2>
  <h3>Todays topic was</h3>
  <p>${title}</p>
  <h3>Die wichtigsten Inhalte heute waren</h3>
  <p>${content}</p>
  <h3>Besonders positiv erinnere ich</h3>
  <p>${positive}</p>
  <h3>Besonders negativ erinnere ich</h3>
  <p>${negative}</p>
  <h3>Meinem Coach würde ich sagen</h3>
  <p>${coachFeedback}</p>
  <h3>Außerdem war mir heute noch wichtig</h3>
  <p>${additional}</p>`

  return (
    <>
      <Header title={'My Diary Entries'} />
      <EntryDetails>
        <ArrowBack onClick={() => handleBackClick(history)}>
          <FontAwesomeIcon icon={faLongArrowAltLeft} />
        </ArrowBack>
        <h2>Dear Diary from {date}</h2>
        <h3>Todays topic was</h3>
        <p>{title}</p>
        <h3>Die wichtigsten Inhalte heute waren</h3>
        <p>{content}</p>
        <h3>Besonders positiv erinnere ich</h3>
        <p>{positive}</p>
        <h3>Besonders negativ erinnere ich</h3>
        <p>{negative}</p>
        <h3>Meinem Coach würde ich sagen</h3>
        <p>{coachFeedback}</p>
        <h3>Außerdem war mir heute noch wichtig</h3>
        <p>{additional}</p>
        <ShowDayRating entryRating={rating} />
        <Share>
          <ShareViaSlackButton idForURL={id} />
          <ShareViaMailButton message={message} entryDate={date} />
        </Share>
      </EntryDetails>
    </>
  )
}
