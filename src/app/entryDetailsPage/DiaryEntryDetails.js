import React from 'react'
import styled from 'styled-components'
import { findIndex, editEntriesInMongoDB, createDetailsObject } from '../utils'
import { Header } from '../common/Header'
import { ArrowBack } from '../common/ArrowBack'
import { ShareViaSlackButton } from './ShareViaSlackButton'
import moment from 'moment'
import 'moment/locale/de'
import { ShowSingleDetail } from './ShowSingleDetail'
import { DiaryEntryDetailsTimestamps } from './DiaryEntryDetailsTimestamps'
import { ShowRating } from './ShowRating'
import PropTypes from 'prop-types'

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

const BackButton = styled.div`
  left: 13px;
  position: absolute;
  top: 85px;
  z-index: 50;
`

export function DiaryEntryDetails({
  match,
  diaryEntries,
  onBackClick,
  history,
  onEditDetails,
  workOfflineStatus,
}) {
  const { id } = match.params
  const entryIndex = findIndex(id, diaryEntries)
  const diaryEntry = diaryEntries[entryIndex]
  const { date, rating } = diaryEntry
  const detailsToRender = createDetailsObject(diaryEntry)

  async function handleEditDetails(detailType, input) {
    const diaryEntryToChange = {
      ...diaryEntry,
      [detailType]: input,
      edit: { status: true, editOn: moment()._d },
    }
    if (workOfflineStatus) {
      const offlineChangedEntry = {
        ...diaryEntryToChange,
        inDatabase: false,
      }
      onEditDetails([
        ...diaryEntries.slice(0, entryIndex),
        offlineChangedEntry,
        ...diaryEntries.slice(entryIndex + 1),
      ])
    } else {
      const newDiaryEntries = await editEntriesInMongoDB(
        diaryEntries,
        diaryEntryToChange,
        entryIndex
      )
      onEditDetails(newDiaryEntries)
    }
  }

  return (
    <>
      <Header title={'My Diary Entries'} />
      <EntryDetails>
        <BackButton>
          <ArrowBack onBackClick={onBackClick} history={history} />
        </BackButton>
        <h2>Dear Diary from {moment(date).format('L')}</h2>
        {detailsToRender.map(detailObject => (
          <ShowSingleDetail
            key={detailObject.headline}
            detail={detailObject}
            onEditDetail={handleEditDetails}
          />
        ))}
        <ShowRating rating={rating} onEditDetail={handleEditDetails} />
        <DiaryEntryDetailsTimestamps diaryEntry={diaryEntry} />
        <Share>
          <ShareViaSlackButton idForURL={id} />
        </Share>
      </EntryDetails>
    </>
  )
}

DiaryEntryDetails.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  diaryEntries: PropTypes.array.isRequired,
  onBackClick: PropTypes.func.isRequired,
  onEditDetails: PropTypes.func.isRequired,
  workOfflineStatus: PropTypes.bool.isRequired,
}
