import React from 'react'
import uid from 'uid'
import moment from 'moment'
import 'moment/locale/de'

import { Header } from './Header'
import { DiaryEntryForm } from './DiaryEntryForm'

moment.locale('de')

export function CreateDiaryEntryForm({ onFormSubmit, history, diaryEntries }) {
  function handleSubmitNewEntry(form, date) {
    const newDiaryEntries = [
      {
        title: form.topic.value,
        date: date,
        rating: form.dayrating.value,
        content: form['content in own words'].value,
        positive: form['remember positive'].value,
        negative: form['remember negative'].value,
        coachFeedback: form['coach feedback'].value,
        additional: form['anything else'].value,
        id: uid(),
        shared: { status: false, sharedOn: '', sharedWith: '' },
        edit: { status: false, editOn: '' },
        createDate: moment(),
      },
      ...diaryEntries,
    ]
    onFormSubmit(newDiaryEntries, history)
  }

  return (
    <>
      <Header title={'Create Diary Entries'} />
      <DiaryEntryForm onFormSubmit={handleSubmitNewEntry} />
    </>
  )
}
