import React, { useEffect } from 'react'
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
const StyledIcon = styled.span`
  color: green;
  font-size: 2rem;
  margin-top: 10px;
`

export function FailedToCreateModal({ resetCreateModal }) {
  useEffect(() => {
    window.setTimeout(() => resetCreateModal(), 2000)
  })
  return (
    <Dialogue>
      Failed to create entry
      <br />
      Choose working offline
      <StyledIcon>
        <FontAwesomeIcon icon={faExclamationTriangle} color="red" />
      </StyledIcon>
    </Dialogue>
  )
}

FailedToCreateModal.propTypes = {
  resetCreateModal: PropTypes.func.isRequired,
}
