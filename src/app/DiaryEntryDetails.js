import React from 'react'
import styled from 'styled-components'
import { ShowDayRating } from './ShowDayRating'
import { findIndex } from './utils'
import { Header } from './Header'
import { ArrowBack } from './ArrowBack'
import { ShareViaSlackButton } from './ShareViaSlackButton'
import moment from 'moment'
import 'moment/locale/de'

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
  p {
    color: #002f47;
    font-size: 1rem;
    margin: 10px;
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
    },
    {
      headline: 'Die wichtigsten Inhalte heute waren',
      content: content,
    },
    {
      headline: 'Besonders positiv erinnere ich',
      content: positive,
    },
    {
      headline: 'Besonders negative erinnere ich',
      content: negative,
    },
    {
      headline: 'Meinem Coach würde ich sagen',
      content: coachFeedback,
    },
    {
      headline: 'Außerdem war mir heute noch wichtig',
      content: additional,
    },
  ]

  return (
    <>
      <Header title={'My Diary Entries'} />
      <EntryDetails>
        <ArrowBack onBackClick={onBackClick} history={history} />
        <h2>Dear Diary from {date}</h2>
        {detailsToRender.map(obj => (
          <section key={obj.headline}>
            <h3>{obj.headline}</h3>
            <p>{obj.content}</p>
          </section>
        ))}
        <ShowDayRating entryRating={rating} />
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
