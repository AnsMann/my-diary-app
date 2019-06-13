import React from 'react'
import moment from 'moment'
import 'moment/locale/de'

import { Header } from './Header'
import { DiaryEntryForm } from './DiaryEntryForm'
import { fetchEntries } from './services'

moment.locale('de')

export function CreateDiaryEntryForm({ onFormSubmit, history, diaryEntries }) {
  async function handleSubmitNewEntry(form, date) {
    const newDiaryEntry = {
      title: form.topic.value,
      date: date,
      rating: form.dayrating.value,
      content: form['content in own words'].value,
      positive: form['remember positive'].value,
      negative: form['remember negative'].value,
      coachFeedback: form['coach feedback'].value,
      additional: form['anything else'].value,
      shared: { status: false, sharedOn: '', sharedWith: '' },
      edit: { status: false, editOn: '' },
      createDate: moment()._d,
    }
    const entry = await fetchEntries(newDiaryEntry, 'POST')
    const newDiaryEntries = [entry, ...diaryEntries]
    onFormSubmit(newDiaryEntries, history)
  }

  return (
    <>
      <Header title={'Create Diary Entries'} />
      <DiaryEntryForm onFormSubmit={handleSubmitNewEntry} />
    </>
  )
}
