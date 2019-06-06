import React from 'react'
import { Header } from './Header'
import { DiaryEntryForm } from './DiaryEntryForm'

export function CreateDiaryEntryForm({ handleSubmit, history }) {
  return (
    <>
      <Header title={'Create Diary Entries'} />
      <DiaryEntryForm handleSubmit={handleSubmit} history={history} />
    </>
  )
}
