/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle as farCheckCircle } from '@fortawesome/free-regular-svg-icons'
import PropTypes from 'prop-types'

library.add(farCheckCircle)

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

export function SyncConfirmationModalDialogue({ history }) {
  useEffect(() => {
    window.setTimeout(() => history.push('/'), 2000)
  }, [])
  return (
    <Dialogue>
      Sync completed
      <StyledIcon>
        <FontAwesomeIcon icon={farCheckCircle} />
      </StyledIcon>
    </Dialogue>
  )
}

SyncConfirmationModalDialogue.propTypes = {
  history: PropTypes.object.isRequired,
}
