import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import styled from 'styled-components'
import GlobalStyles from '../misc/GlobalStyles'
import moment from 'moment'
import 'moment/locale/de'
import uid from 'uid'
import ScrollMemory from 'react-router-scroll-memory'

import { Footer } from './Footer'
import { DiaryEntriesList } from './DiaryEntriesList'
import { CreateDiaryEntryForm } from './CreateDiaryEntry'
import { setLocalStorage, getLocalStorage } from './services'
import { DiaryEntryDetails } from './DiaryEntryDetails'
import { ShareDiaryEntry } from './ShareDiaryEntry'
import { findIndex } from './utils'
import { EditDiaryEntry } from './EditDiaryEntry'

moment.locale('de')

const Grid = styled.div`
  display: grid;
  grid-template-rows: 80px 1fr 80px;
  height: 100vh;
`

export default function App() {
  const [diaryEntries, setDiaryEntries] = useState(
    getLocalStorage('my diary') || []
  )

  useEffect(() => setLocalStorage('my diary', diaryEntries), [diaryEntries])

  function handleSubmit(event, date, history, entryId = null) {
    const { target } = event
    event.preventDefault()
    if (entryId) {
      const index = findIndex(entryId, diaryEntries)
      const diaryEntrytoChange = diaryEntries[index]
      const changedDiaryEntry = {
        ...diaryEntrytoChange,
        title: target.topic.value,
        date: date,
        rating: target.dayrating.value,
        content: target['content in own words'].value,
        positive: target['remember positive'].value,
        negative: target['remember negative'].value,
        coachFeedback: target['coach feedback'].value,
        additional: target['anything else'].value,
        edit: { status: true, editOn: moment() },
      }
      setDiaryEntries([
        ...diaryEntries.slice(0, index),
        changedDiaryEntry,
        ...diaryEntries.slice(index + 1),
      ])
    } else {
      setDiaryEntries([
        {
          title: target.topic.value,
          date: date,
          rating: target.dayrating.value,
          content: target['content in own words'].value,
          positive: target['remember positive'].value,
          negative: target['remember negative'].value,
          coachFeedback: target['coach feedback'].value,
          additional: target['anything else'].value,
          id: uid(),
          shared: { status: false, sharedOn: '', sharedWith: '' },
          edit: { status: false, editOn: '' },
          createDate: moment(),
        },
        ...diaryEntries,
      ])
    }

    history.push('/')
  }

  function handleBackClick(history) {
    history.goBack()
  }

  function handleSharedDiaryEntry(id, contact, date) {
    const index = findIndex(id, diaryEntries)
    const diaryEntry = diaryEntries[index]
    const sharedDiaryEntry = {
      ...diaryEntry,
      shared: {
        status: true,
        sharedWith: contact,
        sharedOn: date,
      },
    }
    setDiaryEntries([
      ...diaryEntries.slice(0, index),
      sharedDiaryEntry,
      ...diaryEntries.slice(index + 1),
    ])
  }

  function handleDeleteClick(id, history) {
    const index = findIndex(id, diaryEntries)
    setDiaryEntries([
      ...diaryEntries.slice(0, index),
      ...diaryEntries.slice(index + 1),
    ])
    history.push('/')
  }

  function handleEditOnDetailsPage(entryId, changedKey, changedInput) {
    const index = findIndex(entryId, diaryEntries)
    const diaryEntry = diaryEntries[index]
    const diaryEntryToChange = {
      ...diaryEntry,
      [changedKey]: changedInput,
      edit: { status: true, editOn: moment() },
    }
    setDiaryEntries([
      ...diaryEntries.slice(0, index),
      diaryEntryToChange,
      ...diaryEntries.slice(index + 1),
    ])
  }

  return (
    <Router>
      <GlobalStyles />
      <Grid>
        <ScrollMemory elementID="diary" />
        <Route
          exact
          path="/"
          render={props => (
            <DiaryEntriesList
              diaryEntries={diaryEntries}
              history={props.history}
              onDeleteClick={handleDeleteClick}
            />
          )}
        />
        <Route
          exact
          path="/create"
          render={props => (
            <CreateDiaryEntryForm
              handleSubmit={handleSubmit}
              history={props.history}
            />
          )}
        />
        <Route
          exact
          path="/cards/:id"
          render={props => (
            <DiaryEntryDetails
              diaryEntries={diaryEntries}
              onBackClick={handleBackClick}
              {...props}
              onEditDetails={handleEditOnDetailsPage}
            />
          )}
        />
        <Route
          exact
          path="/cards/:id/share"
          render={props => (
            <ShareDiaryEntry
              diaryEntries={diaryEntries}
              diaryID={props.match.params.id}
              history={props.history}
              onBackClick={handleBackClick}
              onShare={handleSharedDiaryEntry}
            />
          )}
        />
        <Route
          exact
          path="/cards/:id/edit"
          render={props => (
            <EditDiaryEntry
              diaryEntries={diaryEntries}
              diaryID={props.match.params.id}
              history={props.history}
              handleSubmit={handleSubmit}
            />
          )}
        />
        <Footer />
      </Grid>
    </Router>
  )
}
