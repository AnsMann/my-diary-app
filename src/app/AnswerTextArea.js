import React, { useState } from 'react'
import styled from 'styled-components'

const Answer = styled.textarea`
  border: 1px solid #007fbf;
  border-radius: 10px;
  font-family: inherit;
  font-size: 1rem;
  padding: 15px 20px 0;
  text-align: justify;
  width: 100%;
`

export function AnswerTextArea({
  name,
  placeholder = 'Type here',
  value,
  rows = '5',
}) {
  const [inputValue, setInputValue] = useState('')
  return (
    <Answer
      onChange={event => setInputValue(event.target.value)}
      rows={rows}
      placeholder={placeholder}
      name={name}
      value={value || inputValue}
    />
  )
}
