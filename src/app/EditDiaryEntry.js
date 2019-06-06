import React from 'react'
import { Header } from './Header'
import { DiaryEntryForm } from './DiaryEntryForm'
import { findIndex } from './utils'

export function EditDiaryEntry({
  diaryEntries,
  diaryID,
  history,
  handleSubmit,
}) {
  const entryIndex = findIndex(diaryID, diaryEntries)

  return (
    <>
      <Header title={'Edit Diary Entries'} />
      <DiaryEntryForm
        handleSubmit={handleSubmit}
        history={history}
        diaryEntryToEdit={diaryEntries[entryIndex]}
      />
    </>
  )
}
