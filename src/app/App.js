import React, { useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import styled from 'styled-components'
import GlobalStyles from '../misc/GlobalStyles'
import { Footer } from './Footer'
import { Header } from './Header'
import { DiaryEntriesList } from './DiaryEntriesList'

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

  return (
    <Router>
      <GlobalStyles />
      <Grid>
        <Route
          exact
          path="/"
          render={() => <Header title={'My Diary Entries'} />}
        />
        <Route
          exact
          path="/"
          render={() => <DiaryEntriesList diaryEntries={diaryEntries} />}
        />
        <Footer />
      </Grid>
    </Router>
  )
}
