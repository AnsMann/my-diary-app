import React from 'react'
import styled from 'styled-components'

const Logo = styled.img`
  height: 60vh;
  width: 60vw;
  position: absolute;
  top: 35vw;
  left: 20vw;
  z-index: -10;
  opacity: 0.5;
`

export function DiaryLogo() {
  return <Logo src="/icons/deardiary2.png" />
}
