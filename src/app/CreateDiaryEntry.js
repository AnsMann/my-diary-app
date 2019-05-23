import React from 'react'
import styled from 'styled-components'
import { DayRating } from './DayRating'

const DiaryEntryForm = styled.form`
  display: grid;
  grid-template-rows: auto;
  overflow: scroll;
  margin-bottom: 15px;
  padding: 20px;
  h3 {
    color: #007fbf;
  }
  input {
    margin-top: 15px;
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

export function CreateDiaryEntryForm() {
  return (
    <DiaryEntryForm>
      <label>
        <h3>Entry date</h3>
        <StyledInput type="text" placeholder="dd-mm-yyyy" />
      </label>
      <label>
        <h3>Topic of the day</h3>
        <StyledInput type="text" placeholder="Enter topic" />
      </label>
      <label>
        <h3>Todays rating</h3>
        <DayRating />
      </label>
      <SaveButton>Save</SaveButton>
    </DiaryEntryForm>
  )
}
