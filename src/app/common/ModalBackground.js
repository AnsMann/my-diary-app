import React from 'react'
import styled from 'styled-components'

const Background = styled.div`
  background: white;
  height: 100vh;
  opacity: 0.5;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100vw;
  z-index: 100;
`

export function ModalBackground() {
  return <Background />
}
