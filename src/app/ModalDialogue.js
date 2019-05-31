import React from 'react'
import styled from 'styled-components'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle as farCheckCircle } from '@fortawesome/free-regular-svg-icons'

library.add(farCheckCircle)

const ModalBackground = styled.div`
  height: 100vh;
  background: white;
  opacity: 0.5;
  position: absolute;
  top: 0px;
  width: 100vw;
  z-index: 100;
`
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
  left: 20vw;
  position: absolute;
  top: 70vw;
  width: 60vw;
  z-index: 200;
`
const StyledSpan = styled.span`
  font-weight: bold;
`
const StyledIcon = styled.span`
  color: green;
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

export function ModalDialogue({ onModalButtonClik, shareWith, history }) {
  return (
    <>
      <ModalBackground />
      <Dialogue>
        Entry shared with
        <StyledSpan>{shareWith}</StyledSpan>
        <StyledIcon>
          <FontAwesomeIcon icon={farCheckCircle} />
        </StyledIcon>
        <StyledButton onClick={() => onModalButtonClik(history)}>
          Ok
        </StyledButton>
      </Dialogue>
    </>
  )
}
