import React, { useState } from 'react'
import styled from 'styled-components'
import { DayRating } from './DayRating'
import 'react-dates/initialize'
import { SingleDatePicker } from 'react-dates'
import 'react-dates/lib/css/_datepicker.css'
import moment from 'moment'
import 'moment/locale/de'

moment.locale('de')

const DiaryEntryForm = styled.form`
  display: grid;
  grid-template-rows: auto;
  overflow: scroll;
  margin-bottom: 15px;
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
const SaveButton = styled.button`
  background: #007fbf;
  border-radius: 10px;
  color: #ffffff;
  font-size: 1.5rem;
`

export function CreateDiaryEntryForm({ handleSubmit }) {
  const [date, setDate] = useState()
  const [focused, setFocus] = useState(false)
  return (
    <DiaryEntryForm onSubmit={event => handleSubmit(event, date)}>
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
        <StyledInput type="text" placeholder="Enter topic" name="topic" />
      </label>
      <label>
        <h3>Todays rating</h3>
        <DayRating />
      </label>
      <SaveButton>Save</SaveButton>
    </DiaryEntryForm>
  )
}
