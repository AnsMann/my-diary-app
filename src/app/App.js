import React, { useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import styled from 'styled-components'
import GlobalStyles from '../misc/GlobalStyles'

import { Header } from './Header'
import { Footer } from './Footer'
import { DiaryEntriesList } from './DiaryEntriesList'
import { CreateDiaryEntryForm } from './CreateDiaryEntry'

const Grid = styled.div`
  display: grid;
  grid-template-rows: 80px 1fr 80px;
  height: 100vh;
`

export default function App() {
  const [diaryEntries, setDiaryEntries] = useState([
    {
      title: 'Introduction to JavaScript',
      date: '03.05.2019',
      rating: 1,
    },
    {
      title: 'MongoDB exercise',
      date: '02.05.2019',
      rating: 2,
    },
    {
      title: 'scrum workshop',
      date: '01.05.2019',
      rating: 3,
    },
  ])

  function handleSubmit(event) {
    const { target } = event
    event.preventDefault()
    setDiaryEntries([
      ...diaryEntries,
      {
        title: target.topic.value,
        date: target.date.value,
        rating: target.dayrating.value,
      },
    ])
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
          render={() => (
            <>
              <Header title={'Create Diary Entries'} />
              <CreateDiaryEntryForm handleSubmit={handleSubmit} />
            </>
          )}
        />
        <Footer />
      </Grid>
    </Router>
  )
}
