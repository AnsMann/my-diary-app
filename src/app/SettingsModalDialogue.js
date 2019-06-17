import React, { useEffect } from 'react'
import styled from 'styled-components'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync } from '@fortawesome/free-solid-svg-icons'

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
  height: 60vw;
  justify-content: center;
  line-height: 3rem;
  left: 13vw;
  position: absolute;
  text-align: center;
  top: 50vw;
  width: 75vw;
  z-index: 200;
`
const StyledIcon = styled.span`
  color: green;
  font-size: 2rem;
  margin-top: 10px;
`

const ModalBackground = styled.div`
  background: white;
  height: 100vh;
  opacity: 0.5;
  position: absolute;
  top: 0px;
  width: 100vw;
  z-index: 100;
`

export function SettingsModalDialogue({ SyncWithDatabase, resetModal }) {
  useEffect(() => {
    SyncWithDatabase()
    window.setTimeout(resetModal, 2500)
  })
  return (
    <>
      <ModalBackground />
      <Dialogue>
        You work online now
        <br />
        Sync with database
        <StyledIcon>
          <FontAwesomeIcon icon={faSync} />
        </StyledIcon>
      </Dialogue>
    </>
  )
}
