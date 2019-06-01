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

  function handleSubmit(event, date, history) {
    const { target } = event

    const pickedDate = moment(date).format('L')
    event.preventDefault()
    setDiaryEntries([
      {
        title: target.topic.value,
        date: pickedDate,
        rating: target.dayrating.value,
        content: target['content in own words'].value,
        positive: target['remember positive'].value,
        negative: target['remember negative'].value,
        coachFeedback: target['coach feedback'].value,
        additional: target['anything else'].value,
        id: uid(),
        showMenu: false,
      },
      ...diaryEntries,
    ])

    history.push('/')
  }

  function handleBackClick(history) {
    history.goBack()
  }
  function handleMenuClick(entryId) {
    const index = findIndex(entryId, diaryEntries)
    const diaryentry = diaryEntries[index]
    const diaryEntryToShowMenu = {
      ...diaryentry,
      showMenu: !diaryentry.showMenu,
    }
    setDiaryEntries([
      ...diaryEntries.slice(0, index),
      diaryEntryToShowMenu,
      ...diaryEntries.slice(index + 1),
    ])
  }

  function resetEntryMenus() {
    const entriesWithReset = diaryEntries.map(entry => {
      return { ...entry, showMenu: false }
    })
    setDiaryEntries(entriesWithReset)
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
              resetEntryMenus={resetEntryMenus}
              diaryEntries={diaryEntries}
              onMenuClick={handleMenuClick}
              history={props.history}
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
              handleBackClick={handleBackClick}
              {...props}
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
            />
          )}
        />
        <Footer />
      </Grid>
    </Router>
  )
}
