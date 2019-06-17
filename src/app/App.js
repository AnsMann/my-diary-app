import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import styled from 'styled-components'
import GlobalStyles from '../misc/GlobalStyles'
import moment from 'moment'
import 'moment/locale/de'
import ScrollMemory from 'react-router-scroll-memory'

import { Footer } from './Footer'
import { DiaryEntriesList } from './DiaryEntriesList'
import { CreateDiaryEntry } from './CreateDiaryEntry'
import {
  getEntriesFromMongoDB,
  setLocalStorage,
  getLocalStorage,
} from './services'
import { DiaryEntryDetails } from './DiaryEntryDetails'
import { ShareDiaryEntry } from './ShareDiaryEntry'
import { findIndex } from './utils'
import { EditDiaryEntry } from './EditDiaryEntry'
import { Settings } from './Settings'
import { NoConnectionModal } from './NoConnectionModal'

moment.locale('de')

const Grid = styled.div`
  display: grid;
  grid-template-rows: 80px 1fr 80px;
  height: 100vh;
`

export default function App() {
  const [diaryEntries, setDiaryEntries] = useState(
    getLocalStorage('myDiary') || []
  )
  const [sendAnonymous, setSendAnonymous] = useState(
    getLocalStorage('sendAnonymous') || false
  )
  const [workOffline, setWorkOffline] = useState(
    getLocalStorage('workOffline') || false
  )
  const [isNoConnectionModalVisible, setIsNoConnectionModalVisible] = useState(
    false
  )

  useEffect(() => {
    async function fetchDiaryEntries() {
      const entries = await getEntriesFromMongoDB()
      entries.name
        ? setIsNoConnectionModalVisible(true)
        : setDiaryEntries(entries)
    }
    workOffline || fetchDiaryEntries()
  }, [])

  useEffect(() => setLocalStorage('sendAnonymous', sendAnonymous), [
    sendAnonymous,
  ])

  useEffect(() => setLocalStorage('workOffline', workOffline), [workOffline])

  useEffect(() => {
    workOffline && setLocalStorage('myDiary', diaryEntries)
  }, [diaryEntries, workOffline])

  function handleWorkOfflineCheckbox() {
    setWorkOffline(!workOffline)
  }

  function handleAnonymousCheckbox() {
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

  function handleDeleteClick(id, history, entryToDeleteInDB = null) {
    const index = findIndex(id, diaryEntries)
    entryToDeleteInDB
      ? setDiaryEntries([
          ...diaryEntries.slice(0, index),
          entryToDeleteInDB,
          ...diaryEntries.slice(index + 1),
        ])
      : setDiaryEntries([
          ...diaryEntries.slice(0, index),
          ...diaryEntries.slice(index + 1),
        ])
    history.push('/')
  }

  function handleEditOnDetailsPage(newDiaryEntries) {
    setDiaryEntries(newDiaryEntries)
  }

  function handleSyncButtonClick(updatedEntries) {
    setLocalStorage('myDiary', updatedEntries)
    setDiaryEntries(updatedEntries)
  }
  function resetNoConnectionModal() {
    setIsNoConnectionModalVisible(false)
  }

  return (
    <Router>
      <GlobalStyles />
      {isNoConnectionModalVisible && (
        <NoConnectionModal resetModal={resetNoConnectionModal} />
      )}
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
              workOfflineStatus={workOffline}
            />
          )}
        />
        <Route
          exact
          path="/create"
          render={props => (
            <CreateDiaryEntry
              onFormSubmit={handleFormSubmit}
              history={props.history}
              diaryEntries={diaryEntries}
              workOfflineStatus={workOffline}
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
              workOfflineStatus={workOffline}
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
              workOfflineStatus={workOffline}
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
              workOfflineStatus={workOffline}
            />
          )}
        />
        <Route
          exact
          path="/settings"
          render={props => (
            <Settings
              history={props.history}
              anonymousCheckboxStatus={sendAnonymous}
              onAnonymousCheckboxClick={handleAnonymousCheckbox}
              onworkOfflineCheckboxClick={handleWorkOfflineCheckbox}
              workOfflineCheckboxStatus={workOffline}
              onSyncButtonClick={handleSyncButtonClick}
              diaryEntries={diaryEntries}
            />
          )}
        />
        <Footer />
      </Grid>
    </Router>
  )
}
