import React from 'react'
import styled from 'styled-components'
import { DiaryEntry } from './DiaryEntry'

const DiaryEntriesContainer = styled.ul`
  overflow: scroll;
  padding: 20px;
`

export function DiaryEntriesList({ diaryEntries }) {
  return (
    <DiaryEntriesContainer>
      <DiaryEntry entries={diaryEntries} />
    </DiaryEntriesContainer>
  )
}
