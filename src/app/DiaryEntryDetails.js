import React, { useState } from 'react'
import styled from 'styled-components'
import { ShowDayRating } from './ShowDayRating'
import { findIndex } from './utils'
import { Header } from './Header'
import { ArrowBack } from './ArrowBack'
import { ShareViaSlackButton } from './ShareViaSlackButton'
import moment from 'moment'
import 'moment/locale/de'
import { ShowSingleDetail } from './ShowSingleDetail'
import { DayRatingInput } from './DayRatingInput'

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

export function DiaryEntryDetails({
  match,
  diaryEntries,
  onBackClick,
  history,
  onEdit,
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
  const [editRating, setEditrating] = useState(false)

  function handleDayRatingClick() {
    setEditrating(true)
  }

  function handleEdit(detailType, input) {
    onEdit(id, detailType, input)
  }

  return (
    <>
      <Header title={'My Diary Entries'} />
      <EntryDetails>
        <ArrowBack onBackClick={onBackClick} history={history} />
        <h2>Dear Diary from {date}</h2>
        {detailsToRender.map(obj => (
          <ShowSingleDetail
            key={obj.headline}
            title={obj.headline}
            content={obj.content}
            onEdit={handleEdit}
            detailType={obj.type}
          />
        ))}
        {editRating ? (
          <DayRatingInput />
        ) : (
          <ShowDayRating
            onShowDayRatingClick={handleDayRatingClick}
            entryRating={rating}
          />
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
