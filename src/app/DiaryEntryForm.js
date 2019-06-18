import React, { useState } from 'react'
import styled from 'styled-components'
import { DayRatingInput } from './DayRatingInput'
import 'react-dates/initialize'
import { SingleDatePicker } from 'react-dates'
import '../misc/_datepicker.css'
import moment from 'moment'
import 'moment/locale/de'
import { QuestionCatalogue } from './QuestionCatalogue'
import { FormSubmitButton } from './FormSubmitButton'

moment.locale('de')

const StyledForm = styled.form`
  display: grid;
  grid-template-rows: auto;
  margin-bottom: 15px;
  overflow: scroll;
  padding: 20px;
  h3 {
    color: #007fbf;
  }
  label {
    margin-bottom: 15px;
  }
`

const StyledInput = styled.input`
  border: solid 1px #007fbf;
  border-radius: 10px;
  font-size: 1rem;
  height: 50px;
  padding-left: 20px;
  width: 100%;
`

export function DiaryEntryForm({ onFormSubmit, diaryEntryToEdit = '' }) {
  const [date, setDate] = useState(moment(diaryEntryToEdit.date) || moment())
  const [focused, setFocus] = useState(false)

  return (
    <StyledForm
      onSubmit={event => {
        event.preventDefault()
        onFormSubmit(event.target, date._d)
      }}
    >
      <label>
        <h3>Entry date</h3>
        <SingleDatePicker
          block={true}
          placeholder={'Enter date'}
          displayFormat={() => moment.localeData().longDateFormat('L')}
          showClearDate={true}
          isOutsideRange={() => false}
          numberOfMonths={1}
          date={date}
          onDateChange={date => setDate(date)}
          focused={focused}
          onFocusChange={({ focused }) => setFocus(focused)}
        />
      </label>
      <label>
        <h3>Topic of the day</h3>
        <StyledInput
          placeholder="Enter topic"
          name="topic"
          defaultValue={diaryEntryToEdit.title}
        />
      </label>
      <QuestionCatalogue defaultValues={diaryEntryToEdit} />
      <label>
        <h3>Todays rating</h3>
        <DayRatingInput defaultValue={diaryEntryToEdit.rating} />
      </label>
      <FormSubmitButton title={'Save'} />
    </StyledForm>
  )
}
