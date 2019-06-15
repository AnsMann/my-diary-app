import React from 'react'
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
  height: 60vw;
  justify-content: center;
  left: 13vw;
  position: absolute;
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

const StyledButton = styled.button`
  background: #007fbf;
  border-radius: 10px;
  color: #ffffff;
  font-size: 1.5rem;
  margin-top: 20px;
  padding: 5px;
  width: 80%;
`

export function SettingsModalDialogue({ onConfirmationClick, resetModal }) {
  return (
    <>
      <ModalBackground />
      <Dialogue>
        You switched to work online
        <StyledIcon>
          <FontAwesomeIcon icon={faSync} />
        </StyledIcon>
        <StyledButton
          onClick={() => {
            onConfirmationClick()
            resetModal()
          }}
        >
          Sync now
        </StyledButton>
      </Dialogue>
    </>
  )
}
