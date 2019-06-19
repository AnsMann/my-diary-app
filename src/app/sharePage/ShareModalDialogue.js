import React from 'react'
import styled from 'styled-components'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle as farCheckCircle } from '@fortawesome/free-regular-svg-icons'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'

library.add(farCheckCircle, faExclamationTriangle)

const Dialogue = styled.div`
  align-items: center;
  background: white;
  border: solid 2px #007fbf;
  border-radius: 10px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
  color: #007fbf;
  display: flex;
  flex-direction: column;
  font-size: 1.3rem;
  justify-content: center;
  padding: 10px;
`

const StyledIconSuccess = styled.span`
  color: green;
  font-size: 2rem;
  margin-top: 10px;
`
const StyledIconFail = styled.span`
  color: red;
  font-size: 2rem;
  margin-top: 10px;
`

const StyledButton = styled.button`
  background: #007fbf;
  border-radius: 10px;
  color: #ffffff;
  font-size: 1.5rem;
  margin-top: 20px;
  padding: 5px;
  width: 80%;
`

export function ShareModalDialogue({ onModalButtonClick, shareWith }) {
  return shareWith ? (
    <Dialogue>
      Entry shared with
      <strong>{shareWith}</strong>
      <StyledIconSuccess>
        <FontAwesomeIcon icon={farCheckCircle} />
      </StyledIconSuccess>
      <StyledButton onClick={() => onModalButtonClick(true, shareWith)}>
        Ok
      </StyledButton>
    </Dialogue>
  ) : (
    <Dialogue>
      <strong>Entry not shared</strong>
      <StyledIconFail>
        <FontAwesomeIcon icon={faExclamationTriangle} />
      </StyledIconFail>
      <StyledButton onClick={() => onModalButtonClick(false, shareWith)}>
        Ok
      </StyledButton>
    </Dialogue>
  )
}

ShareModalDialogue.propTypes = {
  shareWith: PropTypes.string.isRequired,
  onModalButtonClick: PropTypes.func.isRequired,
}
