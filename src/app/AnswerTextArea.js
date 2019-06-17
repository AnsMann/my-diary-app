import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

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
  defaultValue,
  rows = '5',
}) {
  return (
    <Answer
      rows={rows}
      placeholder={placeholder}
      name={name}
      defaultValue={defaultValue}
    />
  )
}

AnswerTextArea.propTypes = {
  rows: PropTypes.number,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  defaultValue: PropTypes.string,
}
