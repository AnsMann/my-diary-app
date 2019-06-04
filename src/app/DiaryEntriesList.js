import React, { useEffect } from 'react'
import styled from 'styled-components'
import { DiaryEntry } from './DiaryEntry'
import { Header } from './Header'

const DiaryEntriesContainer = styled.ul`
  overflow: scroll;
  padding: 20px;
`

export function DiaryEntriesList({ diaryEntries, history }) {
  return (
    <>
      <Header title={'My Diary Entries'} />
      <DiaryEntriesContainer id="diary">
        {diaryEntries.map(entry => (
          <DiaryEntry key={entry.id} entry={entry} history={history} />
        ))}
      </DiaryEntriesContainer>
    </>
  )
}
