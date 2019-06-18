import React, { useState } from 'react'
import styled from 'styled-components'
import { AnswerTextArea } from './AnswerTextArea'
import OutsideClickHandler from 'react-outside-click-handler'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import { FormSubmitButton } from './FormSubmitButton'

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

export function ShowSingleDetail({ detail, onEditDetail }) {
  const { headline, content, type } = detail

  const [isEditable, setIsEditable] = useState(false)

  return isEditable ? (
    <OutsideClickHandler onOutsideClick={() => setIsEditable(false)}>
      <h3>{headline}</h3>
      <form
        onSubmit={event => {
          event.preventDefault()
          onEditDetail(type, event.target[type].value)
          setIsEditable(false)
        }}
      >
        <AnswerTextArea defaultValue={content} name={type} />
        <FormSubmitButton title={'Change text'} />
      </form>
    </OutsideClickHandler>
  ) : (
    <SingleDetail>
      <h3>{headline}</h3>
      <p onClick={() => setIsEditable(true)}>
        {content || 'Kein Eintrag'}
        <EditIcon>
          <FontAwesomeIcon icon={faPencilAlt} />
        </EditIcon>
      </p>
    </SingleDetail>
  )
}
ShowSingleDetail.propTypes = {
  detail: PropTypes.object.isRequired,
  onEditDetail: PropTypes.func.isRequired,
}
