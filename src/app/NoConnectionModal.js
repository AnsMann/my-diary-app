import React, { useEffect } from 'react'
import styled from 'styled-components'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'

library.add(faExclamationTriangle)

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

  p {
    font-weight: bold;
    padding: 5px;
    text-align: center;
  }
`
const StyledIcon = styled.span`
  color: red;
  font-size: 2rem;
  margin-top: 10px;
`

export function NoConnectionModal({ resetModal }) {
  useEffect(() => {
    window.setTimeout(() => resetModal(), 3500)
  })
  return (
    <Dialogue>
      <p>No Connection to database</p>
      <StyledIcon>
        <FontAwesomeIcon icon={faExclamationTriangle} />
      </StyledIcon>
      <p>Go to settings to work offline or try again later</p>
    </Dialogue>
  )
}

NoConnectionModal.propTypes = {
  resetModal: PropTypes.func.isRequired,
}
