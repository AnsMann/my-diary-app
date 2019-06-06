import React, { useState } from 'react'
import styled from 'styled-components'
import { AnswerTextArea } from './AnswerTextArea'
import OutsideClickHandler from 'react-outside-click-handler'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

library.add(faPencilAlt)

const SingleDetail = styled.section`
  color: #007fbf;
  position: relative;
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

const EditIcon = styled.i`
  position: absolute;
  color: #007fbf;
  display: inline;
  font-size: 1rem;
  bottom: 0;
  right: 0;
`
const SaveButton = styled.button`
  background: #007fbf;
  border-radius: 10px;
  color: #ffffff;
  font-size: 1rem;
  height: 30px;
  margin: 5px 0;
  width: 100%;
`

export function ShowSingleDetail({ title, content, onEditDetail, detailType }) {
  const [isEditable, setIsEditable] = useState(false)
  return isEditable ? (
    <OutsideClickHandler onOutsideClick={() => setIsEditable(false)}>
      <h3>{title}</h3>
      <form
        onSubmit={event => {
          event.preventDefault()
          onEditDetail(detailType, event.target[detailType].value)
          setIsEditable(false)
        }}
      >
        <AnswerTextArea
          defaultValue={content}
          name={detailType}
          onEditText={onEditDetail}
        />
        <SaveButton>Change text</SaveButton>
      </form>
    </OutsideClickHandler>
  ) : (
    <SingleDetail>
      <h3>{title}</h3>
      <p onClick={() => setIsEditable(true)}>
        {content || 'Kein Eintrag'}
        <EditIcon>
          <FontAwesomeIcon icon={faPencilAlt} />
        </EditIcon>
      </p>
    </SingleDetail>
  )
}
