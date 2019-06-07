import React from 'react'
import { Header } from './Header'
import { DiaryEntryForm } from './DiaryEntryForm'
import { findIndex } from './utils'

export function EditDiaryEntry({
  diaryEntries,
  diaryID,
  history,
  onFormSubmit,
}) {
  const entryIndex = findIndex(diaryID, diaryEntries)

  return (
    <>
      <Header title={'Edit Diary Entries'} />
      <DiaryEntryForm
        onFormSubmit={onFormSubmit}
        history={history}
        diaryEntryToEdit={diaryEntries[entryIndex]}
      />
    </>
  )
}
