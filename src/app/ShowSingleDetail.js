import React, { useState } from 'react'
import styled from 'styled-components'
import { AnswerTextArea } from './AnswerTextArea'
import OutsideClickHandler from 'react-outside-click-handler'

const SingleDetail = styled.section`
  color: #007fbf;
  h3 {
    font-size: 1.2rem;
    justify-self: left;
  }
  p {
    color: #002f47;
    font-size: 1rem;
    margin: 10px;
  }
`

export function ShowSingleDetail({ title, content, onEditDetail, detailType }) {
  const [isEditable, setIsEditable] = useState(false)
  return isEditable ? (
    <OutsideClickHandler onOutsideClick={() => setIsEditable(false)}>
      <h3>{title}</h3>
      <AnswerTextArea
        value={content}
        name={detailType}
        onEditText={onEditDetail}
      />
    </OutsideClickHandler>
  ) : (
    <SingleDetail>
      <h3>{title}</h3>
      <p onClick={() => setIsEditable(true)}>{content || 'Kein Eintrag'}</p>
    </SingleDetail>
  )
}
