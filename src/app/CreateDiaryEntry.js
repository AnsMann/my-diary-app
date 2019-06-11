import React from 'react'
import { Header } from './Header'
import { DiaryEntryForm } from './DiaryEntryForm'
import { DiaryLogo } from './DiaryLogo'

export function CreateDiaryEntryForm({ onFormSubmit, history }) {
  return (
    <>
      <Header title={'Create Diary Entries'} />
      <DiaryLogo />
      <DiaryEntryForm onFormSubmit={onFormSubmit} history={history} />
    </>
  )
}
