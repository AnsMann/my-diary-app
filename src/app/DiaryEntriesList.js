import React, { useEffect } from 'react'
import styled from 'styled-components'
import { DiaryEntry } from './DiaryEntry'
import { Header } from './Header'

const DiaryEntriesContainer = styled.ul`
  overflow: scroll;
  padding: 20px;
`

export function DiaryEntriesList({
  resetEntryMenus,
  diaryEntries,
  onMenuClick,
  history,
}) {
  useEffect(() => resetEntryMenus(), [])
  return (
    <>
      <Header title={'My Diary Entries'} />
      <DiaryEntriesContainer id="diary">
        <DiaryEntry
          entries={diaryEntries}
          onMenuClick={onMenuClick}
          history={history}
        />
      </DiaryEntriesContainer>
    </>
  )
}
