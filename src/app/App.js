import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import styled from 'styled-components'
import GlobalStyles from '../misc/GlobalStyles'
import moment from 'moment'
import 'moment/locale/de'
import ScrollMemory from 'react-router-scroll-memory'

import { Footer } from './Footer'
import { DiaryEntriesList } from './DiaryEntriesList'
import { CreateDiaryEntryForm } from './CreateDiaryEntry'
import { getEntriesFromMongoDB } from './services'
import { DiaryEntryDetails } from './DiaryEntryDetails'
import { ShareDiaryEntry } from './ShareDiaryEntry'
import { findIndex } from './utils'
import { EditDiaryEntry } from './EditDiaryEntry'
import { Settings } from './Settings'

moment.locale('de')

const Grid = styled.div`
  display: grid;
  grid-template-rows: 80px 1fr 80px;
  height: 100vh;
`

export default function App() {
  const [diaryEntries, setDiaryEntries] = useState([])

  useEffect(() => {
    async function fetchDiaryEntries() {
      const entries = await getEntriesFromMongoDB()
      setDiaryEntries(entries)
    }
    fetchDiaryEntries()
  }, [])

  useEffect(() => setLocalStorage('sendAnonymous', sendAnonymous), [
    sendAnonymous,
  ])
  function handleAnonymousCheckbox() {
    console.log('klappt')
    setSendAnonymous(!sendAnonymous)
  }
  function handleFormSubmit(newDiaryEntries, history) {
    setDiaryEntries(newDiaryEntries)
    history.push('/')
  }

  function handleBackClick(history) {
    history.goBack()
  }

  function handleSharedDiaryEntry(newDiaryEntries) {
    setDiaryEntries(newDiaryEntries)
  }

  function handleDeleteClick(id, history) {
    const index = findIndex(id, diaryEntries)
    setDiaryEntries([
      ...diaryEntries.slice(0, index),
      ...diaryEntries.slice(index + 1),
    ])
    history.push('/')
  }

  function handleEditOnDetailsPage(newDiaryEntries) {
    setDiaryEntries(newDiaryEntries)
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
              onFormSubmit={handleFormSubmit}
              history={props.history}
              diaryEntries={diaryEntries}
            />
          )}
        />
        <Route
          exact
          path="/entries/:id"
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
          path="/entries/:id/share"
          render={props => (
            <ShareDiaryEntry
              diaryEntries={diaryEntries}
              diaryID={props.match.params.id}
              history={props.history}
              onBackClick={handleBackClick}
              onShare={handleSharedDiaryEntry}
              sendAnonymous={sendAnonymous}
            />
          )}
        />
        <Route
          exact
          path="/entries/:id/edit"
          render={props => (
            <EditDiaryEntry
              diaryEntries={diaryEntries}
              diaryID={props.match.params.id}
              history={props.history}
              onFormSubmit={handleFormSubmit}
            />
          )}
        />
        <Route
          exact
          path="/settings"
          render={() => (
            <Settings
              anonymousCheckboxStatus={sendAnonymous}
              onAnonymousCheckboxClick={handleAnonymousCheckbox}
            />
          )}
        />
        <Footer />
      </Grid>
    </Router>
  )
}
