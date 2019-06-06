import React, { useState } from 'react'
import styled from 'styled-components'
import OutsideClickHandler from 'react-outside-click-handler'
import { ShowDayRating } from './ShowDayRating'
import { findIndex } from './utils'
import { Header } from './Header'
import { ArrowBack } from './ArrowBack'
import { ShareViaSlackButton } from './ShareViaSlackButton'
import moment from 'moment'
import 'moment/locale/de'
import { ShowSingleDetail } from './ShowSingleDetail'
import { DayRatingInput } from './DayRatingInput'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

library.add(faPencilAlt)

moment.locale('de')

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
    margin-bottom: 0;
  }
  small {
    color: #c3b8c5;
  }
  span {
    font-size: 2rem;
  }
`

const Share = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`
const SaveButton = styled.button`
  background: #007fbf;
  border-radius: 10px;
  color: #ffffff;
  font-size: 1rem;
  height: 30px;
  margin: 5px 0;
  width: 100%;
`

const EditIcon = styled.div`
  color: #007fbf;
  display: inline;
  font-size: 1rem;
  position: relative;
  top: -50px;
  right: -275px;
`

export function DiaryEntryDetails({
  match,
  diaryEntries,
  onBackClick,
  history,
  onEditDetails,
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
    shared,
  } = diaryEntries[entryIndex]

  const detailsToRender = [
    {
      headline: 'Todays topic was',
      content: title,
      type: 'title',
    },
    {
      headline: 'Die wichtigsten Inhalte heute waren',
      content: content,
      type: 'content',
    },
    {
      headline: 'Besonders positiv erinnere ich',
      content: positive,
      type: 'positive',
    },
    {
      headline: 'Besonders negative erinnere ich',
      content: negative,
      type: 'negative',
    },
    {
      headline: 'Meinem Coach würde ich sagen',
      content: coachFeedback,
      type: 'coachFeedback',
    },
    {
      headline: 'Außerdem war mir heute noch wichtig',
      content: additional,
      type: 'additional',
    },
  ]
  const [isRatingEditable, setIsRatingEditable] = useState(false)

  function handleEditDetails(detailType, input) {
    onEditDetails(id, detailType, input)
  }

  function handleEditRating(event) {
    const { target } = event
    event.preventDefault()
    setIsRatingEditable(false)
    onEditDetails(id, 'rating', target.dayrating.value)
  }

  return (
    <>
      <Header title={'My Diary Entries'} />
      <EntryDetails>
        <ArrowBack onBackClick={onBackClick} history={history} />
        <h2>Dear Diary from {date}</h2>
        {detailsToRender.map(detailObject => (
          <ShowSingleDetail
            key={detailObject.headline}
            title={detailObject.headline}
            content={detailObject.content}
            onEditDetail={handleEditDetails}
            detailType={detailObject.type}
          />
        ))}
        {isRatingEditable ? (
          <OutsideClickHandler
            onOutsideClick={() => setIsRatingEditable(false)}
          >
            <form
              onSubmit={event => {
                handleEditRating(event)
              }}
            >
              <label>
                <DayRatingInput defaultValue={rating} />
              </label>
              <SaveButton>Change rating</SaveButton>
            </form>
          </OutsideClickHandler>
        ) : (
          <div onClick={() => setIsRatingEditable(true)}>
            <ShowDayRating entryRating={rating} />
            <EditIcon>
              <FontAwesomeIcon icon={faPencilAlt} />
            </EditIcon>
          </div>
        )}
        {shared.status && (
          <small>
            last shared with <strong>{shared.sharedWith}</strong>
            <br /> on <strong>{shared.sharedOn}</strong>
          </small>
        )}
        <Share>
          <ShareViaSlackButton idForURL={id} />
        </Share>
      </EntryDetails>
    </>
  )
}
