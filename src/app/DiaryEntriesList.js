import React from 'react'
import styled from 'styled-components'
import { DiaryEntryCard } from './DiaryEntryCard'

const DiaryEntriesContainer = styled.ul`
  display: flex;
  flex-direction: column;
  overflow: scroll;
  padding: 20px;
`

export function DiaryEntriesList({ diaryEntries }) {
  return (
    <DiaryEntriesContainer>
      <DiaryEntryCard entries={diaryEntries} />
    </DiaryEntriesContainer>
  )
}
