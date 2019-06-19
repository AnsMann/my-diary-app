import React, { useEffect } from 'react'
import styled from 'styled-components'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'

library.add(faSync)

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
  font-weight: bold;
  justify-content: center;
  line-height: 3rem;
  text-align: center;
`
const StyledIcon = styled.span`
  color: green;
  font-size: 2rem;
  margin-top: 10px;
`

export function SettingsModalDialogue({ SyncWithDatabase, resetModal }) {
  useEffect(() => {
    SyncWithDatabase()
    window.setTimeout(resetModal, 2500)
  })
  return (
    <Dialogue>
      You work online now
      <br />
      Sync with database
      <StyledIcon>
        <FontAwesomeIcon icon={faSync} />
      </StyledIcon>
    </Dialogue>
  )
}

SettingsModalDialogue.propTypes = {
  SyncWithDatabase: PropTypes.func.isRequired,
  resetModal: PropTypes.func.isRequired,
}
