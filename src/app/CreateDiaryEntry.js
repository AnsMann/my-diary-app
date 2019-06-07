import React from 'react'
import { Header } from './Header'
import { DiaryEntryForm } from './DiaryEntryForm'

export function CreateDiaryEntryForm({ onFormSubmit, history }) {
  return (
    <>
      <Header title={'Create Diary Entries'} />
      <DiaryEntryForm onFormSubmit={onFormSubmit} history={history} />
    </>
  )
}
