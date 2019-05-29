import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import styled from 'styled-components'
import GlobalStyles from '../misc/GlobalStyles'
import moment from 'moment'
import 'moment/locale/de'
import uid from 'uid'

import { Header } from './Header'
import { Footer } from './Footer'
import { DiaryEntriesList } from './DiaryEntriesList'
import { CreateDiaryEntryForm } from './CreateDiaryEntry'
import { setLocalStorage, getLocalStorage } from './services'
import { DiaryEntryDetails } from './DiaryEntryDetails'

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
      },
      ...diaryEntries,
    ])
    history.push('/')
  }

  function handleBackClick(history) {
    history.goBack()
  }

  return (
    <Router>
      <GlobalStyles />
      <Grid>
        <Route
          exact
          path="/"
          render={() => (
            <>
              <Header title={'My Diary Entries'} />
              <DiaryEntriesList diaryEntries={diaryEntries} />
            </>
          )}
        />
        <Route
          exact
          path="/create"
          render={props => (
            <>
              <Header title={'Create Diary Entries'} />
              <CreateDiaryEntryForm
                handleSubmit={handleSubmit}
                history={props.history}
              />
            </>
          )}
        />
        <Route
          exact
          path="/cards/:id"
          render={props => (
            <>
              <Header title={'My Diary Entries'} />
              <DiaryEntryDetails
                diaryEntries={diaryEntries}
                handleBackClick={handleBackClick}
                {...props}
              />
            </>
          )}
        />
        <Footer />
      </Grid>
    </Router>
  )
}
